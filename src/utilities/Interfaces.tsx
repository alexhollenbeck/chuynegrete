import { ReactNode } from 'react'

export interface IHeaderProps {
  title: any
  background?: string
  curved?: boolean
  description?: any
  actions?: IActionGroup
  label?: any
  graphic?: ReactNode
  children?: ReactNode
}
export interface ILink {
  brandColor?: string
  active?: boolean
  label: string
  path?: string
  rel?: string
  target?: string
  icon?: ReactNode
  children?: any
  links?: ILink[]
  mobileOnly?: boolean
  desktopOnly?: boolean
  newLabel?: boolean
}
export interface IStepProps {
  title: string
  description: string
}
export interface IQuoteProps {
  color?: string
  clientMarkSVG: ReactNode
  clientNameSVG?: ReactNode
  quoteText: ReactNode
  author: {
    name: string
    role: string
  }
  caseStudy?: string
}
export interface IQuoteRowData {
  index?: number
  intro?: {
    icon?: ReactNode
    title: string
  }
  content: ReactNode
  quote?: IQuoteProps
}
export interface IFeatureProps {
  title: string
  description: string
  label?: ReactNode
  testimonial?: ReactNode
  icon?: ReactNode
  graphic?: any
  href?: string
}
export interface IFeaturesProps {
  title: string
  features?: IFeatureProps[]
}
export interface IPlanFeatures {
  title: any
  plans?: {
    info?: ReactNode
    enabled?: boolean
  }[]
}
export interface IIconProps {
  SVG: {
    height: number
    width: number
  }
  Path?: {
    fill: string
  }
}
export interface IFeatureRowProps {
  children?: any
  title?: any
  label?: string
  lead?: any
  icon?: ReactNode
  mock?: ReactNode
  featureSet?: string[]
  mockBackground?: ReactNode
  action?: {
    arrow?: boolean
    label: string
    path: string
  }
}
export interface IButtonStyles {
  borderColor?: string
  color?: string
  disabled?: boolean
  flat?: boolean
  fill?: string
  fontSize?: number
  iconPos?: string
  textOnly?: boolean
}
export interface IActionProps {
  action?: {
    arrow?: boolean
    label: string
    path?: string
    target?: string
    icon?: ReactNode
    onClick?: () => void
  }
  customHTML?: ReactNode
  className?: string
  form?: boolean
  id?: string
  style?: Partial<IButtonStyles>
  download?: boolean
}
export interface IPostObject {
  id: string
  date: string
  seoUrlSlug: string
  status: string
  url: string
  seo_title: string
  postTitle: string
  summary: {
    summary: string
  }
  body: string
  featuredImage: {
    file: {
      url: string
    }
  }
  category: string
  author: {
    fullName: string
    headshot: {
      file: {
        url: string
      }
    }
  }
}
interface IActionGroup {
  primary: IActionProps
  secondary?: IActionProps
}
export default IActionGroup

export interface ITypographyProps {
  color: string
  fontSize: number
  fontWeight: number
  fontFamily: string
  lineHeight: number
}
export interface IJob {
  additional: string
  additionalPlain: string
  categories: {
    commitment: string
    location: string
    team: string
  }
  createdAt: number
  description: string
  descriptionPlain: string
  hostedUrl: string
  id: string
  lists: {
    content: string
    text: string
  }[]
  text: string
}

/**
 *  CONTENTFUL INTERFACES
 *  The following interfaces are associated with content
 *  models in Contentful. Updating them may break things.
 *  Check app.contentful.com first.
 */

export interface IStat {
  value: number
  date: Date
  // increase per minute
  rate: number
  name: string
}

export interface ICompany {
  name: string
  industry?: string
  primaryColor?: string
  logo?: {
    file: {
      url: string
    }
  }
}

export interface ICard {
  title?: string
  body?: {
    body: string
  }
  ctaText: string
  ctaHref?: string
  icon?: {
    file: {
      url: string
    }
  }
}

export interface ICTA {
  title?: string
  text?: string
  ctaText: string
  href: string
}

export interface IImage {
  file: {
    url: string
  }
}

export interface INavigation {
  name: string
  links: {
    text: string
    page?: {
      url: string
    }
    url?: string
    icon?: {
      file: {
        url: string
      }
    }
  }[]
}
