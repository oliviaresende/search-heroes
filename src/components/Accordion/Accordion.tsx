import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IMyAccordion {
  title: string;
  contentData:
    | string
    | [
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

const MyAccordion = ({ title, contentData }: IMyAccordion) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={title}
        id={title}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {typeof contentData === "string" ? (
          <Typography>{contentData}</Typography>
        ) : (
          contentData.map((content) => (
            <Grid
              container
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginBottom={2}
              key={content.id}
            >
              <Grid item xs={3}>
                <Avatar
                  alt={content.title}
                  src={`${content.thumbnail.path}.${content.thumbnail.extension}`}
                  sx={{ width: 64, height: 64 }}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography>{content.title}</Typography>
              </Grid>
            </Grid>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MyAccordion;
