import * as React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { get } from "lodash";
import { Header, Container, Segment, Icon, Label, Button, Grid, Card, Image, Item, Comment } from "semantic-ui-react";
import { MarkdownRemark, ImageSharp, MarkdownRemarkConnection, Site } from "../graphql-types";
import BlogTitle from "../components/BlogTitle";
import { DiscussionEmbed } from "disqus-react";
import {withLayout, LayoutProps} from "../components/Layout";
import { graphql } from "gatsby";

interface BlogPostProps extends LayoutProps {
  data: {
    post: MarkdownRemark;
    recents: MarkdownRemarkConnection;
    site: Site
  };
}

const config = require("../../gatsby-config.js");

const BlogPostPage = (props: BlogPostProps) => {
  const { frontmatter, html, timeToRead } = props.data.post;
  const avatar = frontmatter.author.avatar.children[0] as ImageSharp;

  const tags = props.data.post.frontmatter.tags
    .map((tag) => <Label key={tag}><Link to={`/blog/tags/${tag}/`}>{tag}</Link></Label>);

  const recents = props.data.recents.edges
    .map(({ node }) => {
      const recentAvatar = node.frontmatter.author.avatar.children[0] as ImageSharp;
      const recentCover = get(node, "frontmatter.image.children.0.fixed", {});
      const extra = (
        <Comment.Group>
          <Comment>
            <Comment.Avatar
              src={recentAvatar.fixed.src}
              srcSet={recentAvatar.fixed.srcSet}
            />
            <Comment.Content>
              <Comment.Author style={{ fontWeight: 400 }}>
                {node.frontmatter.author.id}
              </Comment.Author>
              <Comment.Metadata style={{ margin: 0 }}>
                {node.timeToRead} min read
              </Comment.Metadata>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      );

      return (
        <div key={node.fields.slug} style={{ paddingBottom: "1em" }}>
          <Card as={Link}
            to={node.fields.slug}
            image={recentCover}
            header={node.frontmatter.title}
            extra={extra}
          />
        </div>
      );
    });

  const cover = get(frontmatter, "image.children.0.fixed", {} );
  return (
    <Container>
      <Helmet>
        <title>{`${frontmatter.title} | ${config.siteMetadata.title}`}</title>
      </Helmet>
      <BlogTitle />
      <Container text>
        <Segment vertical style={{paddingBottom: 30}}>
          <Header as="h1">{frontmatter.title}</Header>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Description>
                  <Header as="h4">
                    <Icon name="calendar alternate" size="large" />
                    {frontmatter.updatedDate}
                  </Header>
                </Item.Description>
                <Item.Extra>
                  <Icon name="time" size="large" />
                  {timeToRead} min read
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
          <Icon name="tags" size="large" />
          タグ：　{tags}
        </Segment>
    </Container>
    <Image
      {...cover}
      fluid
      style={{marginTop: 60}}
    />
    <Container text>
        <Segment 
          vertical
          style={{marginTop: 60, paddingBottom: 90}}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
        <Segment vertical style={{marginTop: 20, paddingBottom: 30}}>
          <Item.Group>
            <Item>
              <Item.Image size="tiny"
                src={avatar.fixed.src}
                srcSet={avatar.fixed.srcSet}
                circular
              />
              <Item.Content>
                <Item.Extra>管理人</Item.Extra>
                <Item.Description>
                  <Header as="h4">
                    <b>{frontmatter.author.id}</b>
                  </Header>
                </Item.Description>
                <Item.Meta>{frontmatter.author.bio}</Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        {props.data.site
          && props.data.site.siteMetadata
          && props.data.site.siteMetadata.disqus
          && <Segment vertical style={{marginTop: 60}}>
              <DiscussionEmbed shortname={props.data.site.siteMetadata.disqus} config={{}}/>
          </Segment>
        }
      </Container>
      <Segment vertical style={{marginTop: 60}}>
        <Grid padded centered>
          {recents}
        </Grid>
      </Segment>
    </Container>
  );
};

export default withLayout(BlogPostPage);

export const pageQuery = graphql`
  query TemplateBlogPost($slug: String!) {
  site: site {
    siteMetadata {
        disqus
    }
  }
  post: markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    excerpt
    timeToRead
    fields {
      slug
    }
    frontmatter {
      tags
      author {
        id
        bio
        twitter
        avatar {
          children {
            ... on ImageSharp {
              fixed(width: 80, height: 80, quality: 100) {
                src
                srcSet
              }
            }
          }
        }
      }
      title
      updatedDate(formatString: "YYYY/MM/DD")
      image {
        children {
          ... on ImageSharp {
            fixed(height: 200, quality: 100) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
  recents: allMarkdownRemark(
    filter: {
      fields: {slug: {ne: $slug}}
      frontmatter: {draft: {ne: true}},
      fileAbsolutePath: {regex: "/blog/"},
    },
    sort: {order: DESC, fields: [frontmatter___updatedDate]},
    limit: 4
  ) {
    edges {
      node {
        fields {
          slug
        }
        timeToRead
        frontmatter {
          title
          image {
            children {
              ... on ImageSharp {
                fixed(width: 300, height: 100) {
                  src
                  srcSet
                }
              }
            }
          }
          author {
            id
            avatar {
              children {
                ... on ImageSharp {
                  fixed(width: 36, height: 36) {
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
