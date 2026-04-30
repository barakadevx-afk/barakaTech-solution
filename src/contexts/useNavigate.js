import { useContext } from 'react'
import { NavigationContext } from '../App'

export function useNavigate() {
  const context = useContext(NavigationContext)
  // Return navigate function from context or a fallback
  return context?.navigateTo || ((section) => {
    console.log('Navigate to:', section)
    window.dispatchEvent(new CustomEvent('navigate', { detail: section }))
  })
}

export default useNavigate
