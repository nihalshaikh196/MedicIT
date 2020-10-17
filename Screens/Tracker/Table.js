import React from 'react';
import { View, ScrollView } from 'react-native';
import Row from './Row';

const Table = ({ data,click ,navigation }) => {
  return (
    
    <ScrollView horizontal>
      <View>
        <ScrollView stickyHeaderIndices={[0]}>
          {data.length > 1 &&
          <Row
            name="District Name"
            confirmed="Confirmed"
            active="Active"
            recovered="Recovered"
            deaths="Deaths"
            header
          />
          }
          {data.slice(1).map((data1, index) => {
            return (
              <Row
                key={index}
                name={data1.state}
                confirmed={data1.confirmed}
                active={data1.active}
                recovered={data1.recovered}
                deaths={data1.deaths}
                navigation={navigation}
                clickable={click}
              />
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Table;
