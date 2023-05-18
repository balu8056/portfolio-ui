import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'

const SocialMediaIcon = (name: string) => {
  return (
    <>
      {name === 'Twitter' ? <TwitterIcon /> : null}
      {name === 'LinkedIn' ? <LinkedInIcon /> : null}
      {name === 'Facebook' ? <FacebookIcon /> : null}
      {name === 'Instagram' ? <InstagramIcon /> : null}
      {name === 'Github' ? <GitHubIcon /> : null}
    </>
  )
}

export default SocialMediaIcon
