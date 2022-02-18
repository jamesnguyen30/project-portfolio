import { React } from 'react'
// import { FixedSizeList } from 'react-window'
import { List, Pagination } from '@mui/material'
import Post from './Post'
import constants from '../../constants/styles'

const dummyData = (count = 20) => {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push({
      id: i,
      title: `Sample Title ${i}`,
      subtitle: `This is a quite long sub title ${i}`,
      body: 'Writers write descriptive paragraphs because their purpose is to describe something. Their point is that something is beautiful or disgusting or strangely intriguing. Writers write persuasive and argument paragraphs because their purpose is to persuade or convince someone. Their point is that their reader should see things a particular way and possibly take action on that new way of seeing things. Writers write paragraphs of comparison because the comparison will make their point clear to their readers.',
      reviewer: `SampleReviewer_${i}`,
      date: '1-1-2022',
      upvotes: i + 100,
      comments: i + 50
    })
  }
  return items
}

const items = dummyData()

console.log(items)

const PostList = () => (
  <div style={{ marginTop: constants.space.large }}>
    <Pagination count={10} shape="rounded"/>
    <List>
        {items.map(item => {
          return (
            <Post
            title={item.title}
            subtitle={item.subtitle}
            body={item.body}
            reviewer={item.reviewer}
            date={item.date}
            upvotes={item.upvotes}
            comments={item.comments}
            key={item.id}></Post>
          )
        })}
    </List>
    <Pagination count={10} shape="rounded"/>
  </div>
)

export default PostList
