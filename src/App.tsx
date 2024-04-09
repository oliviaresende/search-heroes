import { useState } from "react";
import { Grid, Typography, Avatar, Snackbar, Alert } from "@mui/material";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Loading from "./components/Loading/Loading";
import MyAccordion from "./components/Accordion/Accordion";

import {
  getComicsByHeroId,
  getHeroByName,
  getSeriesByHeroId,
} from "./services/service";

import "./global.css";

export interface IHero {
  id: number;
  thumbnail: {
    extension: string;
    path: string;
  };
  name: string;
  description: string;
  comics: [
    {
      id: number;
      title: string;
      thumbnail: {
        extension: string;
        path: string;
      };
    }
  ];
  series: [
    {
      id: number;
      title: string;
      thumbnail: {
        extension: string;
        path: string;
      };
    }
  ];
}

interface IError {
  content: string;
  type: "info" | "error";
}

interface IErrorResponse {
  code: string;
  response?: {
    data?: {
      status?: string;
      message?: string;
    };
  };
}

function App() {
  const [hero, setHero] = useState<IHero | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<IError>({ content: "", type: "info" });
  const [alertOpen, setAlertOpen] = useState(false);

  const onSearch = async (search: string) => {
    setHero(null);
    setLoading(true);
    let heroData = null;
    let comicsData = null;
    let seriesData = null;

    try {
      heroData = await getHeroByName(search);
      if (!heroData) {
        setAlert({ content: "Hero not found", type: "info" });
        setLoading(false);
        setAlertOpen(true);
        return;
      }
      [comicsData, seriesData] = await Promise.all([
        getComicsByHeroId(heroData.id),
        getSeriesByHeroId(heroData.id),
      ]);
    } catch (e) {
      const error = e as IErrorResponse;
      if (error.code === "ERR_NETWORK") {
        setAlert({ content: "You are offline", type: "error" });
        const heroInfoJson = sessionStorage.getItem(search);
        if (heroInfoJson) {
          setHero(JSON.parse(heroInfoJson));
        }
      } else {
        setAlert({
          content:
            error.response?.data?.status ||
            error.response?.data?.message ||
            "Undefined error",
          type: "error",
        });
      }
      setLoading(false);
      setAlertOpen(true);
      return;
    }
    const heroInfo = { ...heroData, comics: comicsData, series: seriesData };
    setHero(heroInfo);
    sessionStorage.setItem(search, JSON.stringify(heroInfo));

    setLoading(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Grid
      container
      display={"flex"}
      direction={"column"}
      justifyContent={"space-between"}
      minHeight={"100vh"}
    >
      <Header />
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        marginBottom={"16px"}
      >
        <Grid item xs={10} md={8} lg={6}>
          <Search onSearch={onSearch} />

          {loading ? (
            <Loading />
          ) : (
            !!hero && (
              <Grid item>
                <Grid
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  margin={"12px"}
                >
                  <Typography variant="h3">{hero.name}</Typography>
                  <Avatar
                    alt={hero.name}
                    src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                    sx={{ width: 128, height: 128 }}
                  />
                </Grid>
                <MyAccordion
                  title="Description"
                  contentData={hero.description}
                />
                <MyAccordion title="Comics" contentData={hero.comics} />
                <MyAccordion title="Series" contentData={hero.series} />
              </Grid>
            )
          )}
        </Grid>
      </Grid>

      <Footer />

      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%", marginBottom: "56px" }}
        >
          {alert.content}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default App;
