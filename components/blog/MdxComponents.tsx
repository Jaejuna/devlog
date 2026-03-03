import type { MDXComponents } from 'mdx/types'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
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

function AnchorIcon() {
  return (
    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
      #
    </span>
  )
}

const mdxComponents: MDXComponents = {
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

  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-primary-400 dark:border-primary-600 pl-4 my-6 italic text-gray-600 dark:text-gray-400"
      {...props}
    >
      {children}
    </blockquote>
  ),
}

export default mdxComponents
