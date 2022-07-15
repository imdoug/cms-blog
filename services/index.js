import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async ()=>{
      const query = gql`
      query MyQuery {
            postsConnection {
              edges {
                node {
                  author {
                    bio
                    id
                    name
                    photo {
                      url
                    }
                  }
                  createdAt
                  slug
                  title
                  exerpt
                  featuredImage {
                    url
                  }
                  categories {
                    name
                    slug
                  }
                }
              }
            }
          }`
      const result = await request(graphqlAPI, query)
      return result.postsConnection.edges;
}

export const getRecentPosts = async () =>{
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy:createdAt_ASC,
        last: 3
        ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.posts;
}

export const getSimilarPosts = async (slug, categories) =>{
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: {slug_not: $slug, AND: {categories_some: s{lug_in: $categories}}}
        last: 3
        ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
    }
  `
  const result = await request(graphqlAPI, query, {slug, categories})
  return result.posts;
}

export const getCategories = async () =>{
  const query = gql`
    query GetCategories{
      categories{
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.categories;
}

export const getPostsDetails = async (slug)=>{
  const query = gql`
  query GetPostDetails($slug: String!) {
        post(where: {slug: $slug}){
          author {
            bio
            id
            name
            photo {
              url
            }
          }
          createdAt
          slug
          title
          exerpt
          featuredImage {
            url
            }
            categories {
              name
              slug
              }
          }
          content{
            raw
          }
        }
      }`
  const result = await request(graphqlAPI, query, {slug})
  return result.post;
}
