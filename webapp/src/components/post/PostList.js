import { React } from 'react'
// import { FixedSizeList } from 'react-window'
import { List, Pagination } from '@mui/material'
import Post from './Post'
import constants from '../../constants/styles'
import PropTypes from 'prop-types'

// const dummyData = (count = 20) => {
//   const items = []
//   for (let i = 0; i < count; i++) {
//     items.push({
//       id: i,
//       title: `sample title ${i}`,
//       subtitle: `this is a quite long sub title ${i}`,
//       body: 'writers write descriptive paragraphs because their purpose is to describe something. their point is that something is beautiful or disgusting or strangely intriguing. writers write persuasive and argument paragraphs because their purpose is to persuade or convince someone. their point is that their reader should see things a particular way and possibly take action on that new way of seeing things. writers write paragraphs of comparison because the comparison will make their point clear to their readers.',
//       reviewer: `samplereviewer_${i}`,
//       date: '1-1-2022',
//       upvotes: i + 100,
//       comments: i + 50
//     })
//   }
//   return items
// }

// const items = dummydata()
// console.log(items)

const PostList = (props) => {
  const { posts } = props
  return (
    <div style={{ marginTop: constants.space.large }}>
      <Pagination count={10} shape="rounded" />
          <List>
            {posts.map(item => {
              return (
                <Post
                  title={item.title}
                  content={item.content}
                  date={item.date}
                  upvotes={item.upvotes}
                  chapter={item.chapter}
                  key={item.id}></Post>
              )
            })}
          </List>
        <Pagination count={10} shape="rounded" />
      </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostList
