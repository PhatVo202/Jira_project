import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  // const isMobile = useMediaQuery({ query: `(max-width:400px)` });
  const navigate = useNavigate();
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

  const handleOnclick = () => {
    !userReducer && navigate("/jira/projectmanagement");
    userReducer && navigate("/login");
  };

  return (
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
            onClick={() => handleOnclick()}
          >
            Get back to home page
          </Button>
        </div>
        <Image src="./img/404.png" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
