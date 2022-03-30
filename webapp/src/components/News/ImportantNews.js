import React, { useState } from 'react'
import { Box, Typography, Tooltip, Modal, Fade, Divider, List, ListItem, Button } from '@mui/material'
import NewsSource from './NewsSource'
import SummaryButton from './SummaryButton'
import PropTypes from 'prop-types'

const MOCK_URL = 'https://s.yimg.com/uu/api/res/1.2/umgx_Y8MT6e2Z0LvuwSMqw--~B/Zmk9c3RyaW07aD0zMjA7dz01NzA7YXBwaWQ9eXRhY2h5b24-/https://s.yimg.com/os/creatr-uploaded-images/2022-03/2b7bbc10-ac60-11ec-b498-7d6d499b02df.cf.webp'

const ImportantNews = (props) => {
  const [openSummary, setOpenSummary] = useState(false)
  const onModalClose = () => {
    setOpenSummary(false)
  }

  const onModalOpen = () => {
    setOpenSummary(true)
  }
  return (
    <Box
      sx={{
        ...props.sx,
        width: 300,
        height: 360,
        border: 1,
        borderColor: 'secondary.gray',
        backgroundColor: 'primary.white',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        ':hover': {
          cursor: 'pointer',
          boxShadow: 3
        },
        ':hover .stickerNewsImage': {
          height: 100,
          transition: 'height 100ms'
        },
        ':hover .stickerNewsTitle': {
          WebkitLineClamp: 5,
          height: 150,
          transition: 'height 100ms'
        }
      }}
    >
      <Box
        className="stickerNewsImage"
        sx={{
          width: 300,
          height: 200,
          objectFit: 'cover',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        }}
        component={'img'}
        src={MOCK_URL} />

      <NewsSource alt={'ABC news'} />
      <Typography
        className="stickerNewsTitle"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          maxHeight: 150,
          fontSize: '15px',
          fontWeight: 'bold',
          margin: 2
        }}
      >
        Mortgage rate soars closer to 5% in its second huge jump this week. This should be a very long title and it can take up to 3 lines. When it overflows it should be truncated with ellipsis
      </Typography>
      <Box sx={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        marginLeft: 1,
        marginRight: 1,
        marginBottom: 1
      }}>
        <Tooltip title="Is this article helpful?" placement='top-start'>
          <Typography
          sx={{
            flex: 1,
            fontSize: '12px',
            color: 'seconary.black',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
          >Helpful?</Typography>
        </Tooltip>
        <SummaryButton onClick={onModalOpen} />
      </Box>

      <Modal
        open={openSummary}
        onClose={onModalClose}
        closeAfterTransition
      >
        <Fade in={openSummary}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              minHeight: 200,
              border: 0,
              borderRadius: 3,
              boxShadow: 10,
              backgroundColor: 'white',
              padding: 3
            }}
          >
            <Box>
              <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                flex: 1,
                marginRight: 2
              }}>Summary: How Putin war on Ukraine hurts us all and it should be very long title</Typography>
              <Box sx={{ display: 'flex' }}>
                <NewsSource alt={'ABC News'} />
                <Button>Read full article</Button>
              </Box>

            </Box>
            <Divider/>
            <Box sx={{ marginTop: 3, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
              <List
              sx={{
                height: 400,
                overflow: 'auto'
              }}>
                {
                  [1, 2, 3, 4, 5].map((x, index) => (
                  <ListItem
                    key={index}>
                    <Typography>
                    There’s also an economic cost. Putin is destroying Ukraine and as for what he’s doing to Russia, that can only be described as financial suicide. Then there’s the harm he’s inflicting on the rest of the world, including the U.S.
                    </Typography>
                  </ListItem>
                  ))
                }
              </List>
            </Box>
            <Divider/>
            <Typography sx={{ textAlign: 'right', fontSize: '12px' }}>powered by GPT-3</Typography>
          </Box>
        </Fade>
      </Modal>

    </Box>

  )
}

ImportantNews.propTypes = {
  sx: PropTypes.object
}

export default ImportantNews
