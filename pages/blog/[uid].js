import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";

import { queryRepeatableDocuments } from 'utils/queries'

// Project components
import DefaultLayout from "layouts";
import { BackButton, SliceZone } from "components/post";

// Project functions & styles
import { Client } from "utils/prismicHelpers";
import { postStyles } from "styles";

/**
 * Post page component
 */
const Post = ({ post }) => {
  if (post && post.data) {
    const hasTitle = RichText.asText(post.data.title).length !== 0;
    const title = hasTitle ? RichText.asText(post.data.title) : "Untitled";

    return (
      <DefaultLayout>
        <Head>
          <title>{title}</title>
        </Head>

        {/* Blog body */}
        <div className="main">
          <div className="outer-container">
            <BackButton />
            <h1>{title}</h1>
          </div>

          {/* Render slices */}
          <SliceZone sliceZone={post.data.body} />
        </div>

        {/* Next.js styles */}
        <style jsx global>
          {postStyles}
        </style>
      </DefaultLayout>
    );
  }

  return null;
};

export async function getStaticProps({ params }) {
  const post = await Client().getByUID("post", params.uid) || {}
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments((doc) => doc.type === 'post')

  // example
  // documents = [{ id: 1 }, { id: 2 }]
  // then /blog/1, /blog/2 can be accessible from router
  return {
    paths: documents.map(doc => `/blog/${doc.uid}`),
    fallback: true,
  }
}

export default Post;
