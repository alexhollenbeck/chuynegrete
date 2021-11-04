import React, { ReactNode } from 'react'

import { Container, createTheme, ThemeProvider } from '@material-ui/core'
import styled from 'styled-components'

import { Breakpoints } from '../../utilities/Breakpoints'

import '../Layout.css'
import { Link } from 'gatsby'
import { StyledLink } from '../Typography'
import { Colors } from '../../utilities/Colors'

const theme = createTheme({
  breakpoints: {
    values: { ...Breakpoints }
  }
})
const OverflowWrapper = styled.div`
  overflow: hidden;
  position: relative;
`

const NavWrapper = styled.nav`
  padding: 1rem 0;
`
export const Nav = () => (
  <NavWrapper>
    <StyledLink to='/' fontSize={1.25} color={Colors.primary}>
      Home
    </StyledLink>
  </NavWrapper>
)
export default ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <OverflowWrapper>{children}</OverflowWrapper>
  </ThemeProvider>
)
