import React from 'react'

import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { Breakpoints } from '../utilities/Breakpoints'
import { Colors } from '../utilities/Colors'
import { ITypographyProps } from '../utilities/Interfaces'

const Typescale = {
  button: 0.9375,
  description: 0.8125,
  descriptionSmall: 0.75,
  labelXL: 1,
  labelLarge: 0.875,
  label: 0.75,
  labelTiny: 0.625,
  lead: 1.3125,
  link: 0.9375,
  linkSmall: 0.875,
  linkXS: 0.75,
  paragraphSmall: 0.875,
  paragraph: 1,
  paragraphLarge: 1.125,
  displayLarge: 4,
  display: 3,
  titleXL: 2,
  titleLarge: 1.5,
  title: 1.3125,
  titleSmall: 1.125,
  titleXS: 1
}

const FontFamily = {
  brandPrimary: `'proxima-nova', 'Helvetica Neue', Arial, sans-serif`,
  brandSerif: `'PT Serif', Georgia, serif`
}

const TypographyComponent = styled.div<{
  as?: string
  align?: string
  color?: string
  fontSize?: number
  fontSizeMobile?: number
  fontFamily?: string
  fontWeight?: number
  lineHeight?: number
  letterSpacing?: number
  defaultStyles: ITypographyProps
}>`
  ${(props) =>
    props.align
      ? css`
          text-align: ${props.align};
        `
      : null}
  ${(props) =>
    props.letterSpacing
      ? css`
          letter-spacing: ${props.letterSpacing}em;
        `
      : null}
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : props.defaultStyles.fontFamily};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : props.defaultStyles.fontSize}rem;
  ${(props) =>
    props.fontSizeMobile
      ? css`
          @media (max-width: ${Breakpoints.sm}px) {
            font-size: ${props.fontSizeMobile}rem;
          }
        `
      : null}
  line-height: ${(props) =>
    props.lineHeight ? props.lineHeight : props.defaultStyles.lineHeight};
  color: ${(props) => (props.color ? props.color : props.defaultStyles.color)};
  font-weight: ${(props) =>
    props.fontWeight ? props.fontWeight : props.defaultStyles.fontWeight};
  margin: 0;
`

export const Description = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: props.as ? props.as : 'p',
    defaultStyles: {
      color: Colors.text,
      fontFamily: FontFamily.brandPrimary,
      fontSize: Typescale.description,
      fontWeight: 400,
      lineHeight: 1.54
    }
  })
)``

export const DescriptionSmall = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: props.as ? props.as : 'p',
    defaultStyles: {
      color: Colors.text,
      fontFamily: FontFamily.brandPrimary,
      fontSize: Typescale.descriptionSmall,
      fontWeight: 400,
      lineHeight: 2
    }
  })
)``

export const Lead = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'p',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.lead,
    fontWeight: 400,
    lineHeight: 1.524
  }
}))``

export const ParagraphSmall = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: props.as ? props.as : 'p',
    defaultStyles: {
      color: Colors.text,
      fontFamily: FontFamily.brandPrimary,
      fontSize: Typescale.paragraphSmall,
      fontWeight: 400,
      lineHeight: 1.714
    }
  })
)``

export const Paragraph = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'p',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.paragraph,
    fontWeight: 400,
    lineHeight: 1.75
  }
}))``

export const ParagraphLarge = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: props.as ? props.as : 'p',
    defaultStyles: {
      color: Colors.text,
      fontFamily: FontFamily.brandPrimary,
      fontSize: Typescale.paragraphLarge,
      fontWeight: 400,
      lineHeight: 1.556
    }
  })
)``

export const LabelXL = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h3',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.labelXL,
    fontWeight: 600,
    lineHeight: 1.5
  }
}))`
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

export const LabelLarge = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h3',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.labelLarge,
    fontWeight: 500,
    lineHeight: 1.714
  }
}))`
  text-transform: uppercase;
  letter-spacing: 0.179em;
`

export const Label = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h3',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.label,
    fontWeight: 600,
    lineHeight: 2
  }
}))`
  text-transform: uppercase;
  letter-spacing: 0.125em;
`

export const LabelTiny = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h4',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.labelTiny,
    fontWeight: 600,
    lineHeight: 1.6
  }
}))`
  text-transform: uppercase;
  letter-spacing: 0.15em;
`
const defaultLinkStyles = {
  color: Colors.text,
  fontFamily: FontFamily.brandPrimary,
  fontSize: Typescale.link,
  fontWeight: 500,
  lineHeight: 1.5
}

export const chevronRightSVG = (
  <svg width='6' height='10' xmlns='http://www.w3.org/2000/svg'>
    <g fill='none'>
      <path d='M-5-3h16v16H-5z' />
      <path
        d='M.529 1.471A.667.667 0 011.47.53l4 4a.667.667 0 01.02.921l-3.666 4a.667.667 0 01-.983-.9l3.235-3.53L.53 1.471z'
        fill='currentColor'
      />
    </g>
  </svg>
)

const linkCSS = css<{
  arrow?: boolean
  color?: string
  fontFamily?: string
  fontSize?: number
  fontWeight?: number
  hoverColor?: string
  lineHeight?: number
}>`
  color: ${(props) => (props.color ? props.color : defaultLinkStyles.color)};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : defaultLinkStyles.fontFamily};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : defaultLinkStyles.fontSize}rem;
  font-weight: ${(props) =>
    props.fontWeight ? props.fontWeight : defaultLinkStyles.fontWeight};
  line-height: ${(props) =>
    props.lineHeight ? props.lineHeight : defaultLinkStyles.lineHeight};
  position: relative;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => (props.hoverColor ? props.hoverColor : Colors.primary)};
  }
  ${(props) =>
    props.arrow
      ? css`
          svg {
            margin-left: 6px;
            transition: margin-left 0.2s, margin-right 0.2s;
          }
          &:hover svg {
            margin-left: 12px;
            margin-right: -6px;
          }
        `
      : null}
`

export const StyledLinkWrapper = styled(
  ({ arrow, hoverColor, lineHeight, ...props }) => <Link {...props} />
)<{
  arrow?: boolean
  color?: string
  fontFamily?: string
  fontSize?: number
  fontWeight?: number
  hoverColor?: string
  lineHeight?: number
}>`
  ${linkCSS}
`

export const StyledLink = (props) => (
  <StyledLinkWrapper {...props}>
    {props.children}
    {props.arrow && chevronRightSVG}
  </StyledLinkWrapper>
)

export const ExternalLinkWrapper = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: 'a',
    defaultStyles: defaultLinkStyles
  })
)<{
  hoverColor?: string
}>`
  ${linkCSS}
`

export const ExternalLink = (props) => (
  <ExternalLinkWrapper {...props}>
    {props.children}
    {props.arrow && chevronRightSVG}
  </ExternalLinkWrapper>
)

export const DropdownLink = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: props.as ? props.as : 'span',
    defaultStyles: defaultLinkStyles
  })
)`
  cursor: default;
  transition: all 0.3s;
  &:hover {
    color: ${Colors.text};
  }
  &:after {
    content: '';
    height: 18px;
    width: 18px;
    background-size: cover;
    display: inline-block;
    background-color: ${({ color = Colors.text }) => color};
    mask-image: url(/img/chevron-down.svg);
    margin-left: 6px;
    margin-bottom: -5px;
  }
`

const LinkSmallCSS = `
  font-size: ${Typescale.linkSmall}rem;
  line-height: 1.714;
  font-weight: 600;
`

export const StyledLinkSmall = styled(StyledLink)`
  ${LinkSmallCSS}
`

export const ExternalLinkSmall = styled(ExternalLink)`
  ${LinkSmallCSS}
`

const LinkXSCSS = `
  font-size: ${Typescale.linkXS}rem;
  line-height: 2;
  font-weight: 600;
  svg {
    transform: scale(0.8) translateY(1px);
  }
`

export const StyledLinkXS = styled(StyledLink)`
  ${LinkXSCSS}
`

export const ExternalLinkXS = styled(ExternalLink)`
  ${LinkXSCSS}
`

export const TitleXL = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h2',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.titleXL,
    fontWeight: 500,
    lineHeight: 1.188
  }
}))``

export const TitleLarge = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h3',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.titleLarge,
    fontWeight: 500,
    lineHeight: 1.333
  }
}))``

export const Title = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h4',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.title,
    fontWeight: 500,
    lineHeight: 1.524
  }
}))``

export const TitleSmall = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h5',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.titleSmall,
    fontWeight: 500,
    lineHeight: 1.333
  }
}))``

export const TitleXS = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h6',
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandPrimary,
    fontSize: Typescale.titleXS,
    fontWeight: 500,
    lineHeight: 1.5
  }
}))``

export const DisplaySmall = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: props.as ? props.as : 'h1',
    fontSizeMobile: props.fontSizeMobile
      ? props.fontSizeMobile
      : Typescale.titleLarge,
    defaultStyles: {
      color: Colors.text,
      fontFamily: FontFamily.brandSerif,
      fontSize: Typescale.titleXL,
      fontWeight: 600,
      lineHeight: 1.188
    }
  })
)``

export const Display = styled(TypographyComponent as any).attrs((props) => ({
  as: props.as ? props.as : 'h1',
  fontSizeMobile: props.fontSizeMobile
    ? props.fontSizeMobile
    : Typescale.titleXL,
  defaultStyles: {
    color: Colors.text,
    fontFamily: FontFamily.brandSerif,
    fontSize: Typescale.display,
    fontWeight: 600,
    lineHeight: 1.1208
  }
}))``

export const DisplayLarge = styled(TypographyComponent as any).attrs(
  (props) => ({
    as: props.as ? props.as : 'h1',
    fontSizeMobile: props.fontSizeMobile
      ? props.fontSizeMobile
      : Typescale.titleXL,
    defaultStyles: {
      color: Colors.text,
      fontFamily: FontFamily.brandSerif,
      fontSize: Typescale.displayLarge,
      fontWeight: 600,
      lineHeight: 1.1208
    }
  })
)``
