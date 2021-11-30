import React from 'react'

import { BLOCKS } from '@contentful/rich-text-types'

import {
  BlogCTA,
  BlogTable,
  BlogPodcastWidget
} from 'src/components/blog/BlogPostEmbeds'
import CodeBlock from 'src/components/documentation/CodeBlock'
import Note from 'src/components/documentation/Note'
import { Paragraph, ParagraphLarge } from '../components/Typography'

// Check if a rich text node is a code snippet
const isRichTextCodeSnippet = (item) =>
  item.marks &&
  item.marks.length === 1 &&
  item.marks[0].type === 'code' &&
  item.value &&
  item.value.length > 0

// Check if a rich text node is only whitespace
const isRichTextWhitespace = (item) =>
  item.nodeType === 'text' &&
  (!item.value || (item.value && item.value.replace(/\s/g, '').length === 0))
export const richTextOptions = {
  renderNode: {
    // Unpack paragraph nodes and format things more nicely
    [BLOCKS.PARAGRAPH]: (node, children) => {
      // Check for code blocks that were written in rich text instead of embedded
      const content = node.content
      const codeContent = content.filter(isRichTextCodeSnippet)
      const nonCodeContent = content.filter(
        (item) => !isRichTextCodeSnippet(item) && !isRichTextWhitespace(item)
      )
      const nonWhitespaceContent = content.filter(
        (item) => !isRichTextWhitespace(item)
      )
      // Check if node consists of only code blocks
      if (codeContent.length > 0 && nonCodeContent.length === 0) {
        // put it in a <pre> instead of a <p> so it gets formatted properly
        return (
          <div className='gatsby-highlight'>
            <pre className='language-javascript'>{children}</pre>
          </div>
        )
      } else if (nonWhitespaceContent.length === 0) {
        // Get rid of empty paragraphs
        return <></>
      }
      // else return content as it is
      return <ParagraphLarge>{children}</ParagraphLarge>
    },
    // Custom embedded content
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      const target = node.data.target
      if (target && target.internal.type === 'ContentfulVideo') {
        const seconds = target.startTimeSeconds
        const videoId = target.url.split('?v=')[1]
        const baseUrl = `https://www.youtube.com/embed/${videoId}`
        const url = seconds ? baseUrl + '?start=' + seconds : baseUrl
        return (
          <iframe
            width='560'
            height='315'
            src={url}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        )
      }
      // Unknown content type, do not render
      else return <></>
    },
    // Images
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      const target = node.data.target
      return (
        target && (
          <img src={`https://${target.file.url}`} alt={target.description} />
        )
      )
    }
  }
}
