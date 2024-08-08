import { Button, Container, List, ListItem, Typography } from "@mui/material";
import useSWR from "swr";
import Link from "../extra/Link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getPosts = () => fetcher("https://jsonplaceholder.typicode.com/posts");

export default function Page() {
  const { data = [] } = useSWR(`/posts`, getPosts);
  return (
    <Container maxWidth="lg">
      <Typography variant="h1">Page not using getStaticProps</Typography>
      <Button variant="contained" component={Link} noLinkStyle href="/">
        Go to the home page
      </Button>
      <List>
        {data.map((post: any) => (
          <ListItem key={post.id}>{post.title}</ListItem>
        ))}
      </List>
    </Container>
  );
}
