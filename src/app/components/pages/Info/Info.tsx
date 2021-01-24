import React, { useEffect, useState } from 'react';
import { getInfo } from '../../../common/services/infoService';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import Card, { InfoCardProps } from '../../CardInfo/CardInfo';
import { LocalStorageService } from '../../../common/services/localStorageService';
import DataTable from '../../DataTable/DataTable';
import { Container } from '@material-ui/core';

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
}));

const Info = () => {
  const [data, setData] = useState<UserData[]>([]);
  const classes = useStyles();

  useEffect(() => {
    try {
      getInfo(Cookies.get('access_token') as string).then(res => {
        res.forEach((item: UserData) => {
          if (item.madeDadeline) {
            item.madeDadeline = 'true';
          } else {
            item.madeDadeline = 'false';
          }
        });
        setData(res);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      <Card {...(LocalStorageService.getItem('signInData') as InfoCardProps)} />
      {data.length > 0 && <DataTable projectsData={data} />}
    </Container>
  );
};

export default Info;
