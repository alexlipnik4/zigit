import React, { useEffect, useState } from 'react';
import { getInfo } from '../../../common/services/infoService';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import Card, { InfoCardProps } from '../../CardInfo/CardInfo';
import { LocalStorageService } from '../../../common/services/localStorageService';
import DataTable from '../../DataTable/DataTable';
import { Container, Typography } from '@material-ui/core';

export type UserData = {
  bugsCount: number;
  durationInDays: number;
  id: string;
  madeDadeline: boolean | string;
  name: string;
  score: number;
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  statistics: {
    margin: `${theme.spacing(4)} 0`,
    padding: theme.spacing(2),
    background: '#e8e8ff',
  },
}));

const Info = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [clearance, setClearance] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    try {
      getInfo(Cookies.get('access_token') as string).then(res => {
        let countScore = 0;
        let countSuccessful = 0;
        res.forEach((item: UserData) => {
          if (item.madeDadeline) {
            countSuccessful++;
            item.madeDadeline = 'true';
          } else {
            item.madeDadeline = 'false';
          }
          countScore += item.score;
        });
        setClearance(Math.round((countSuccessful / res.length) * 100));
        setAverage(Math.round(countScore / res.length));
        setData(res);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      <Card {...(LocalStorageService.getItem('signInData') as InfoCardProps)} />

      <div className={classes.statistics}>
        <Typography variant="h5">{`Average score: ${average}`}</Typography>
        <Typography variant="h5">{`Deadline clearance percentage: ${clearance}`}</Typography>
      </div>

      {data.length > 0 && <DataTable projectsData={data} setClearance={setClearance} setAverage={setAverage} />}
    </Container>
  );
};

export default Info;
