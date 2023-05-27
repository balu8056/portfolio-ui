import { useEffect, useState } from 'react'
import { useActivePath } from 'src/contexts/activeLink'
import { Grid, IconButton, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import { useInfoGetById } from 'src/lib/apiHelpers'
import { InfoType, SocialMediaType } from 'src/lib/interfaces'
import Skeletons from 'src/components/Skeletons'
import SocialMediaIcon from 'src/components/SocialMediaIcon'

const About = () => {
  const { setActivePath } = useActivePath()

  const [info, setInfo] = useState<InfoType | null>(null)
  const [aboutImg, setAboutImgSrc] = useState<string>('')
  const [isAboutImgLoaded, setIsAboutImgLoaded] = useState<boolean>(false)

  const { data: infoData, isLoading: isInfoLoading } = useInfoGetById(`${process.env.PORTFOLIO_INFO_ID}` || '')

  useEffect(() => {
    setActivePath('About')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isInfoLoading) {
      const res = infoData as InfoType
      setInfo(res)
      setAboutImgSrc(res.aboutImg)
    }
  }, [isInfoLoading, infoData])

  return (
    <>
      <div style={{ marginTop: '70px' }}>
        <Paper
          sx={{
            p: { sm: 2.5, xs: 2 },
            marginX: { sm: '50px', xs: '15px' },
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm spacing={2} container direction="column" justifyContent="center" alignItems="center">
              <Grid item marginTop={2}>
                {isAboutImgLoaded ? (
                  <Skeletons type="image" />
                ) : (
                  <Image
                    alt="Developer Img"
                    src={aboutImg && aboutImg.length > 0 ? aboutImg : '/profile.png'}
                    width={250}
                    height={250}
                    priority={true}
                    style={{
                      userSelect: 'none',
                      pointerEvents: 'none',
                      borderRadius: '10px',
                      display: isAboutImgLoaded ? 'block' : 'none',
                    }}
                    onLoad={() => {
                      setIsAboutImgLoaded(true)
                    }}
                    onError={() => {
                      setAboutImgSrc('/profile.png')
                      setIsAboutImgLoaded(true)
                    }}
                  />
                )}
              </Grid>
              <Grid item>
                <Grid item>
                  {isInfoLoading ? (
                    <Skeletons type="text" />
                  ) : (
                    <Typography gutterBottom variant="body1">
                      <b>Name</b>: {info?.fullName}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  {isInfoLoading ? (
                    <Skeletons type="text" />
                  ) : (
                    <Typography gutterBottom variant="body1">
                      <b>Profile</b>: {info?.designation}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  {isInfoLoading ? (
                    <Skeletons type="text" />
                  ) : (
                    <Typography gutterBottom variant="body1">
                      <b>Email</b>: {info?.email}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  {isInfoLoading ? (
                    <Skeletons type="text" />
                  ) : (
                    <Typography gutterBottom variant="body1">
                      <b>Phone</b>: {info?.phoneNo}
                    </Typography>
                  )}
                </Grid>
                <Grid item container justifyContent="center" alignItems="center">
                  {isInfoLoading
                    ? [1, 2, 3, 4].map((ind: number) => {
                        return <Skeletons key={ind} type="iconSmall" />
                      })
                    : info?.socialMedias.map((val: SocialMediaType, ind: number) => {
                        return (
                          <a key={ind} href={val.url} target="_blank" rel="noopener noreferrer">
                            <IconButton>{SocialMediaIcon(val.name)}</IconButton>
                          </a>
                        )
                      })}
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm container item>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    About me
                  </Typography>
                  {isInfoLoading ? (
                    <Skeletons type="aboutDesc" />
                  ) : (
                    <Typography
                      component="div"
                      gutterBottom
                      dangerouslySetInnerHTML={{ __html: info?.description || '' }}
                    ></Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default About
