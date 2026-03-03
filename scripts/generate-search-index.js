// 빌드 시 public/search-index.json 생성
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'content/posts')
const outputPath = path.join(process.cwd(), 'public', 'search-index.json')

function generateSearchIndex() {
  if (!fs.existsSync(postsDirectory)) {
    console.log('content/posts 디렉토리가 없습니다.')
    return
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const index = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        tags: data.tags ?? [],
        category: data.category,
        date: data.date,
      }
    })

  // public 디렉토리가 없으면 생성
  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf8')
  console.log(`검색 인덱스 생성 완료: ${index.length}개 포스트 → public/search-index.json`)
}

generateSearchIndex()
