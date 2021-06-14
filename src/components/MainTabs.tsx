import styled from "styled-components";
import React, { ChangeEvent, useState } from "react";

import { Tabs, Tab, makeStyles } from "@material-ui/core";
import {
  FreeBreakfast,
  Restaurant,
  EmojiSymbols,
  Search,
} from "@material-ui/icons";

import { TabPanel, BeerTabs } from ".";
import { MAIN_TAB_NAMES } from "../constants";

const TabsContainer = styled.div`
  background: #2a2a2a;
`;

const useStyles = makeStyles({
  tab: {
    background: "red",
    opacity: 1,
  },
  icon: { zIndex: 2, color: "white" },
});

const findTabIcon = (name: string, className: string) => {
  switch (name) {
    case "DRINKS":
      return <FreeBreakfast className={className} />;
    case "FOOD":
      return <Restaurant className={className} />;
    case "SALE":
      return <EmojiSymbols className={className} />;
    case "SEARCH":
      return <Search className={className} />;
    default:
      return <FreeBreakfast className={className} />;
  }
};

const MainTabs = () => {
  const classes = useStyles();
  const [index, setIndex] = useState<number>(0);

  const change = (event: ChangeEvent<{}>, value: any) => {
    setIndex(value);
  };

  return (
    <TabsContainer>
      <Tabs
        value={index}
        onChange={change}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            background: "#2a2a2a",
            height: 47,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
        }}
      >
        {MAIN_TAB_NAMES.map((name) => (
          <Tab icon={findTabIcon(name, classes.icon)} className={classes.tab} />
        ))}
      </Tabs>
      <TabPanel value={index} index={0}>
        <BeerTabs />
      </TabPanel>
      <TabPanel value={index} index={1}>
        <div />
      </TabPanel>
      <TabPanel value={index} index={2}>
        <div />
      </TabPanel>
      <TabPanel value={index} index={3}>
        <div />
      </TabPanel>
    </TabsContainer>
  );
};

export default MainTabs;
