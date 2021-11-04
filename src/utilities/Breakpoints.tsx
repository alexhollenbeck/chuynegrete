import { useMediaQuery, useTheme } from '@material-ui/core'

export const Breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}

export const isSmall = () => useMediaQuery(useTheme().breakpoints.down('xs'))

export const isLarge = () => useMediaQuery(useTheme().breakpoints.up('lg'))
