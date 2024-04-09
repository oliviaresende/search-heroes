import { useState } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
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

function App() {
  const [hero, setHero] = useState<IHero | null>(null);
  const [loading, setLoading] = useState(false);

  const onSearch = async (search: string) => {
    setLoading(true);

    const heroData = await getHeroByName(search);
    const comicsData = await getComicsByHeroId(heroData.id);
    const SeriesData = await getSeriesByHeroId(heroData.id);
    setHero({ ...heroData, comics: comicsData, series: SeriesData });

    setLoading(false);
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
    </Grid>
  );
}

export default App;
