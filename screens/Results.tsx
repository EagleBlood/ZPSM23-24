import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, FlatList, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import { stylesResults } from '../styles/stylesResults';
import { Svg, Polygon } from 'react-native-svg';

const Triangle = () => {
  return (
    <Svg width="10" height="10">
      <Polygon
        points="5,10 0,0 10,0"
        fill="black"
      />
    </Svg>
  );
};

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
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [quizData, setQuizData] = useState<any[]>([]);

  const handleTriangleClick = (nick: string) => {
    setExpandedUser(prevNick => (prevNick === nick ? null : nick));
  };

  useEffect(() => {
    fetchData();
    fetchQuizData();
}, []);

const fetchQuizData = async () => {
    try {
        const response = await fetch('https://tgryl.pl/quiz/tests');
        const data = await response.json();
        setQuizData(data);
    } catch (error) {
        console.error(error);
    }
};

  const fetchData = async () => {
    try {
      const response = await fetch('http://tgryl.pl/quiz/results');
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
        userScores[item.nick].createdOn = item.createdOn > userScores[item.nick].createdOn ? item.createdOn : userScores[item.nick].createdOn;
      } else {
        userScores[item.nick] = { ...item };
      }
    });
  
    const aggregatedData: ResultItem[] = Object.values(userScores);
    aggregatedData.sort((a, b) => b.score - a.score);
  
    return aggregatedData;
  };

  const getQuizName = (type: string): string => {
    const quiz = quizData.find(quiz => quiz.tags.includes(type));
    return quiz ? quiz.name : type;
};

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setShowSearchBox(menu === 'Search');
    setSearchTerm('');
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  };

  const renderItem = ({ item }: { item: ResultItem }) => {
    if (item.nick.toLowerCase().includes(searchTerm.toLowerCase())) {
      return (
        <View style={stylesResults.resultsBox}>
          <View style={stylesResults.resultsBoxView}>
            <View style={stylesResults.resultsBoxItems}>
              <Text style={stylesResults.resultsBoxNickText}>{item.nick}</Text>               
              <Text style={stylesResults.resultsBoxDateText}>{(item.createdOn)}</Text>
            </View>
            <View style={stylesResults.resultsBoxItems}>
              <Text style={stylesResults.resultsBoxScoreText}>{item.score}</Text>
              <Text style={stylesResults.resultsBoxTotalText}>{item.total}</Text>
            </View>   

            <TouchableOpacity style={stylesResults.resultsBoxItems} onPress={() => handleTriangleClick(item.nick)}>
                <Triangle />
            </TouchableOpacity>     
          </View>
          {expandedUser === item.nick && resultsData.filter(result => result.nick === item.nick).map(result => (
            <View style={stylesResults.resultsBoxItems} key={result.id}>
              <Text style={stylesResults.resultsBoxTypeText}>{getQuizName(result.type)}</Text>
              <Text style={stylesResults.resultsBoxScoreExpandedText}>{result.score}</Text>
              <Text style={stylesResults.resultsBoxTotalExpandedText}>{result.total}</Text>
              <Text style={stylesResults.resultsBoxText}>{formatDate(result.createdOn)}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return null;
    }
  };
  
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
                <Text style={stylesResults.resultsBoxHeaderText}>Global Results</Text>
  
                <View style={styles.menuSelect}>
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
                {showSearchBox && (
                <View style={stylesResults.resultsBottomMenuItems}>
                  <Text style={stylesResults.resultsSearchHeaderText}>Search: </Text>
                  <TextInput
                    style={stylesResults.resultsSearchInput}
                    placeholder="Search for a user..."
                    onChangeText={handleSearchChange}
                  />
                </View>
              )}
              </View>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

export default ResultsView;