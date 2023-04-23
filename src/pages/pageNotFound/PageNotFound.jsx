import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  rem,
} from "@mantine/core";

export default function PageNotFound() {
  const userReducer = useSelector((state) => state.userReducer.userInfo);
  const isMobile = useMediaQuery({ query: `(max-width:400px)` });
  const useStyles = createStyles((theme) => ({
    root: {
      paddingTop: rem(80),
      paddingBottom: rem(80),
    },

    title: {
      fontWeight: 900,
      fontSize: rem(34),
      marginBottom: theme.spacing.md,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [theme.fn.smallerThan("sm")]: {
        fontSize: rem(32),
      },
    },

    control: {
      [theme.fn.smallerThan("sm")]: {
        width: "100%",
      },
    },

    mobileImage: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },

    desktopImage: {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
  }));
  const { classes } = useStyles();

  return (
    // <div className="container">
    //   <div
    //     className={isMobile && "py-5 mt-5"}
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <img
    //       style={{ objectFit: "cover" }}
    //       src="./img/notfound.png"
    //       alt="notfound"
    //       width={isMobile && 400}
    //       height={isMobile && 300}
    //     />
    //   </div>
    //   <div className="text-center">
    //     <NavLink to={userReducer ? "/login" : "/projectmanagement"}>
    //       Back to home
    //     </NavLink>
    //   </div>
    // </div>
    <Container className={classes.root} style={{ height: "100vh" }}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
      >
        <Image src="./img/404.png" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            <NavLink
              style={{ textDecoration: "none" }}
              to={userReducer ? "/login" : "/projectmanagement"}
            >
              Get back to home page
            </NavLink>
          </Button>
        </div>
        <Image src="./img/404.png" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
