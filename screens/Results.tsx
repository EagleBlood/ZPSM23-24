import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { styles } from '../styles/styles';
import { stylesResults } from '../styles/stylesResults';

interface ResultItem {
  id: number;
  nick: string;
  score: number;
  total: number;
  type: string;
  createdOn: string;
}

const ResultsView: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('Top 5');
  const [refreshing, setRefreshing] = useState(false);
  const [resultsData, setResultsData] = useState<ResultItem[]>([]);
  const [topTenData, setTopTenData] = useState<ResultItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/results');
      const data: ResultItem[] = await response.json();
      setResultsData(data);
      const aggregatedData = aggregateData(data);
      setTopTenData(aggregatedData.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const aggregateData = (data: ResultItem[]): ResultItem[] => {
    const userScores: { [key: string]: ResultItem } = {};

    data.forEach(item => {
      if (userScores[item.nick]) {
        userScores[item.nick].score += item.score;
        userScores[item.nick].total += item.total;
      } else {
        userScores[item.nick] = { ...item };
      }
    });

    const aggregatedData: ResultItem[] = Object.values(userScores);
    aggregatedData.sort((a, b) => b.score - a.score);

    return aggregatedData;
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }: { item: ResultItem }) => (
    <View style={stylesResults.resultsBox}>
      <View style={stylesResults.resultsBoxView}>
        <View style={stylesResults.resultsBoxItems}>
          <Text style={stylesResults.resultsBoxText}>{item.nick}</Text>               
          <Text style={stylesResults.resultsBoxTypeText}>{item.type}</Text>
          <Text style={stylesResults.resultsBoxText}>{item.createdOn}</Text>
        </View>
        <View style={stylesResults.resultsBoxItems}>
          <Text style={stylesResults.resultsBoxScoreText}>{item.score}</Text>
          <Text style={stylesResults.resultsBoxTotalText}>{item.total}</Text>
        </View>        
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={selectedMenu === 'Top 5' ? topTenData : aggregateData(resultsData)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <>
            <View>
              <View style={stylesResults.resultsHeaderBox}>
                <Text style={stylesResults.resultsBoxHeaderText}>Top User's Results</Text>
  
                <View style={stylesResults.resultsBottomMenuItems}>
                  <TouchableOpacity onPress={() => handleMenuClick('Top 5')}>
                    <Text style={[stylesResults.resultsBottomMenuText, selectedMenu === 'Top 5' && stylesResults.selectedMenu]}>
                      Top 5
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleMenuClick('All the time')}>
                    <Text style={[stylesResults.resultsBottomMenuText, selectedMenu === 'All the time' && stylesResults.selectedMenu]}>
                      All the time
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleMenuClick('Search')}>
                    <Text style={[stylesResults.resultsBottomMenuText, selectedMenu === 'Search' && stylesResults.selectedMenu]}>
                      Search
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

export default ResultsView;