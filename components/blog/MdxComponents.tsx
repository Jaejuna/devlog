import type { MDXComponents } from 'mdx/types'
import type { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from 'react'
import Image from 'next/image'
import CodeBlock from './CodeBlock'

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type AnchorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { href?: string }

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

type CodeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>

type BlockquoteProps = DetailedHTMLProps<
  HTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>

type UlProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
type OlProps = DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>
type LiProps = DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

type TableProps = DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>
type THeadProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
type TBodyProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
type TrProps = DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
type ThProps = DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>
type TdProps = DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>

function AnchorIcon() {
  return (
    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
      #
    </span>
  )
}

const mdxComponents: MDXComponents = {
  img: ({ src, alt }: ImgProps) => {
    if (!src) return null
    return (
      <span className="block my-6">
        <Image
          src={src}
          alt={alt ?? ''}
          width={800}
          height={450}
          className="rounded-lg w-full h-auto"
          style={{ width: '100%', height: 'auto' }}
        />
      </span>
    )
  },

  h2: ({ id, children, ...props }: HeadingProps) => (
    <h2
      id={id}
      className="group text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-20"
      {...props}
    >
      <a href={`#${id}`} className="no-underline">
        {children}
        <AnchorIcon />
      </a>
    </h2>
  ),

  h3: ({ id, children, ...props }: HeadingProps) => (
    <h3
      id={id}
      className="group text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-20"
      {...props}
    >
      <a href={`#${id}`} className="no-underline">
        {children}
        <AnchorIcon />
      </a>
    </h3>
  ),

  code: ({ children, className, ...props }: CodeProps) => {
    // block code (pre > code)는 className이 있음
    if (className) {
      return (
        <code className={`${className} text-sm`} {...props}>
          {children}
        </code>
      )
    }
    // inline code
    return (
      <code
        className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    )
  },

  pre: ({ children }: PreProps) => <CodeBlock>{children}</CodeBlock>,

  a: ({ href, children, ...props }: AnchorProps) => {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      >
        {children}
      </a>
    )
  },

  ul: ({ children, ...props }: UlProps) => (
    <ul
      className="list-disc list-outside pl-6 my-4 space-y-1.5 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: OlProps) => (
    <ol
      className="list-decimal list-outside pl-6 my-4 space-y-1.5 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: LiProps) => (
    <li className="pl-1 leading-relaxed" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-primary-400 dark:border-primary-600 pl-4 my-6 italic text-gray-600 dark:text-gray-400"
      {...props}
    >
      {children}
    </blockquote>
  ),

  table: ({ children, ...props }: TableProps) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: THeadProps) => (
    <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }: TBodyProps) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props}>
      {children}
    </tbody>
  ),

  tr: ({ children, ...props }: TrProps) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, ...props }: ThProps) => (
    <th
      className="px-4 py-2.5 text-left font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: TdProps) => (
    <td
      className="px-4 py-2.5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
      {...props}
    >
      {children}
    </td>
  ),
}

export default mdxComponents
