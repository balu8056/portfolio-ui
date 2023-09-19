import { useEffect, useState } from 'react'
import { useActivePath } from 'src/contexts/activeLink'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useExperiencesGetById, useInfoGetById, useWorksGetById } from 'src/lib/apiHelpers'
import { ExperienceType, InfoType, SkillCertificationType, WorkType } from 'src/lib/interfaces'
import Skeletons from 'src/components/Skeletons'
import { Grid } from '@mui/material'

const Experience = () => {
  const { setActivePath } = useActivePath()

  const [skills, setSkills] = useState<Array<SkillCertificationType>>([])
  const [certificates, setCertificates] = useState<Array<SkillCertificationType>>([])
  const [works, setWorks] = useState<Array<WorkType>>([])

  const [experiences, setExperiences] = useState<ExperienceType[] | null>(null)

  const { data: expsData, isLoading: isExpsLoading } = useExperiencesGetById(`${process.env.PORTFOLIO_INFO_ID}` || '')
  const { data: infoData, isLoading: isInfoLoading } = useInfoGetById(`${process.env.PORTFOLIO_INFO_ID}` || '')
  const { data: worksData, isLoading: isWorkLoading } = useWorksGetById(`${process.env.PORTFOLIO_INFO_ID}` || '')

  useEffect(() => {
    setActivePath('Experience')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isExpsLoading) {
      setExperiences(expsData as ExperienceType[])
    }
    if (!isInfoLoading) {
      const infoRes = infoData as InfoType
      setSkills(infoRes.skills)
      setCertificates(infoRes.certification)
    }
    if (!isWorkLoading) {
      setWorks(worksData as WorkType[])
    }
  }, [isExpsLoading, expsData, isInfoLoading, infoData, isWorkLoading, worksData])

  return (
    <>
      <Grid container direction="column" style={{ marginTop: '5%', height: '100%' }}>
        <Grid item sx={{ marginTop: 4, marginBottom: 2 }}>
          <Typography gutterBottom align="center" variant="h4" color="#fff">
            Experience
          </Typography>
          {isExpsLoading ? (
            <Skeletons type="exps" />
          ) : (
            <Timeline position="alternate">
              {experiences?.map((exp: ExperienceType, ind: number) => (
                <TimelineItem key={ind}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="#fff">
                    {exp.from} - {exp.to}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <Image
                        alt="Developer Img"
                        src={exp.companyLogo}
                        width={25}
                        height={25}
                        style={{
                          userSelect: 'none',
                          pointerEvents: 'none',
                          borderRadius: '10px',
                        }}
                      />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }} color="#fff">
                    <Typography variant="h5" component="span">
                      {exp.companyName}
                    </Typography>
                    <Typography color="#fff">{exp.designation}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          )}
        </Grid>

        <Grid item sx={{ marginY: 2 }}>
          <Typography gutterBottom align="center" variant="h4" color="#fff">
            Highlights
          </Typography>

          {isWorkLoading ? (
            <Grid container item justifyContent="start" sx={{ paddingX: { md: '100px', xs: '10px' } }}>
              <Skeletons type="contDesc" />
            </Grid>
          ) : (
            <Grid container item justifyContent="start" sx={{ paddingX: { md: '100px', xs: '10px' } }}>
              {works.map((workRes: WorkType, ind: number) => (
                <Grid item key={ind} rowSpacing={4}>
                  <Typography variant="h6" color="#fff">
                    {workRes.heading}
                  </Typography>
                  <Typography
                    gutterBottom
                    align="left"
                    color="#fff"
                    dangerouslySetInnerHTML={{ __html: workRes.description }}
                  ></Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item sx={{ marginY: 2 }}>
          <Typography gutterBottom align="center" variant="h4" color="#fff">
            Skills
          </Typography>

          {isInfoLoading ? (
            <Skeletons type="skillsCerts" />
          ) : (
            <Grid container item direction="row" columns={24} justifyContent="center">
              {skills.map((skillRes: SkillCertificationType, ind: number) => (
                <Grid item key={ind} sx={{ padding: 2 }} md={6} xs={12} justifyContent="center">
                  <Typography sx={{ padding: 1 }} align="center" color="#fff">
                    {skillRes.name}
                  </Typography>
                  <Image
                    src={skillRes.logo}
                    alt="Skill Sets"
                    loading="lazy"
                    width={120}
                    height={120}
                    style={{
                      margin: 'auto',
                      display: 'block',
                      borderRadius: '60%',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* <Grid item sx={{ marginY: 2 }}>
          <Typography gutterBottom align="center" variant="h4" color="#fff">
            Certifications
          </Typography>

          {isInfoLoading ? (
            <Skeletons type="skillsCerts" />
          ) : (
            <Grid container item direction="row" columns={24} justifyContent="center">
              {certificates.map((certificatesRes: SkillCertificationType, ind: number) => (
                <Grid item key={ind} md={6} xs={12} justifyContent="center">
                  <Typography align="center" color="#fff">
                    {certificatesRes.name}
                  </Typography>
                  <Image
                    src={certificatesRes.logo}
                    alt="Certification Sets"
                    loading="lazy"
                    width={150}
                    height={150}
                    style={{
                      margin: 'auto',
                      display: 'block',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid> */}
      </Grid>
    </>
  )
}

export default Experience
