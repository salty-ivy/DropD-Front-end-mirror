import React, { useState } from 'react'
import TimelineNav from '../../components/timelinenav/timelineNav'
import "./createpost.css"
import CreatePost from '../../components/Createpost/CreatePost'
import { useParams } from 'react-router-dom'
const { REACT_APP_API_HOST } = process.env;


function Createpost() {

  const {cid, pageId} = useParams()
  console.log(cid,"club id for create post")


console.log(pageId)

  return (
    <div>
      <TimelineNav/>
      <CreatePost clubID={cid?cid:false} pageID={pageId?pageId:false} />
    </div>
  )
}

export default Createpost