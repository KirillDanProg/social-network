import {NewPost} from "./NewPost";
import {Post} from "./Post";
import React from "react";
import {PostsPropsType} from "./PostsContainer";

export const Posts = (props: PostsPropsType) => {
    return (
        <div>
            <NewPost addPost={props.addPost}/>

            {props.profile.postsData.map((post) => (
                <Post img={post.img}
                      key={post.id}
                      id={post.id}
                      likes={post.likes}
                      deletePost={props.deletePost}
                      postText={post.postText}/>
            ))}
        </div>
    )
}