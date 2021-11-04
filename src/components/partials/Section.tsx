import styled, { css } from 'styled-components'
import { Breakpoints } from '../../utilities/Breakpoints'

export const SectionWrapper = styled.section`
  padding-bottom: 5rem;
  padding-top: 5rem;
`
export const ResponsiveSectionWrapper = styled(SectionWrapper as any)<{
  paddingLarge: string
  paddingMedium: string
  paddingSmall: string
}>`
  ${(props) => css`
    ${props.paddingLarge
      ? `
      padding: ${props.paddingLarge};
    `
      : null}
    ${props.paddingMedium
      ? `
      @media (max-width: ${Breakpoints.md}px) {
        padding: ${props.paddingMedium};
      }
    `
      : null}
    ${props.paddingSmall
      ? `
      @media (max-width: ${Breakpoints.sm}px) {
        padding: ${props.paddingSmall};
      }
    `
      : null}
  `}
`
