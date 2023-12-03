import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { styles } from '../styles/styles';
import { stylesResults } from '../styles/stylesResults';
import resultsData from "../data/resultsData"

const ResultsView: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('Top 10');
  const [refreshing, setRefreshing] = useState(false);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  interface ResultItem {
    id: number;
    nick: string;
    score: number;
    total: number;
    type: string;
    date: string;
  }

  const renderItem = ({ item }: { item: ResultItem }) => (
    <View style={stylesResults.resultsBox}>
      <View style={stylesResults.resultsBoxView}>
        <View style={stylesResults.resultsBoxItems}>
          <Text style={stylesResults.resultsBoxText}>{item.nick}</Text>               
          <Text style={stylesResults.resultsBoxTypeText}>{item.type}</Text>
          <Text style={stylesResults.resultsBoxText}>{item.date}</Text>
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
        data={resultsData.results}
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
                  <TouchableOpacity onPress={() => handleMenuClick('Top 10')}>
                    <Text style={[stylesResults.resultsBottomMenuText, selectedMenu === 'Top 10' && stylesResults.selectedMenu]}>
                      Top 10
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