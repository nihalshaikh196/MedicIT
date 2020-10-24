import React from 'react';
import {StyleSheet, Text, TouchableOpacity,View} from 'react-native';

const VaccineInfo = ({name}) => {

    let info,site,route;

  if (name == 'BCG') {
    info="BCG, or bacille Calmette-Guerin, is a vaccine for tuberculosis disease. Many foreign-born persons have been BCG-vaccinated. BCG is used in many countries with a high prevalence of TB to prevent childhood tuberculous meningitis and miliary disease.";

    site="Left Upper Arm";

    route="Intra-dermal";

  } else if (name == 'OPV-0') {
    info="Oral poliovirus vaccines (OPV) are the predominant vaccine used in the fight to eradicate polio.  There are different types of oral poliovirus vaccine, which may contain one, a combination of two, or all three different serotypes of attenuated vaccine. Each has their own advantages and disadvantages over the others.";

    site="Oral";

    route="Oral";
    
  } else if (name == 'Hepatitis B') {
    info="Oral poliovirus vaccines (OPV) are the predominant vaccine used in the fight to eradicate polio.  There are different types of oral poliovirus vaccine, which may contain one, a combination of two, or all three different serotypes of attenuated vaccine. Each has their own advantages and disadvantages over the others.";

    site="Oral";

    route="Oral";
  }
  return (
    <View style={styles.box}>
      
      <Text style={[styles.title]}>Information:</Text>
      <Text style={styles.content}>          {info}</Text>

      <Text style={[styles.title]}>Site:</Text>
      <Text style={styles.content}>          {site}</Text>

      <Text style={[styles.title]}>Route:</Text>
      <Text style={styles.content}>          {route}</Text>
    </View>
  );
};

export default VaccineInfo;

const styles = StyleSheet.create({
  box: {
    //backgroundColor: '#4285f4',
    margin:10,  
    borderColor:'white',
    marginTop:20,
  },
  content:{
    color: '#4285f4',
    textAlign: 'left',
    fontSize: 18,
    marginLeft:5,
    paddingVertical: 3,
  },

  title: {
    color: '#4285f4',
    textAlign: 'left',
    fontSize: 25,
    fontWeight:'bold',
    marginLeft:5,
    paddingVertical: 3,
  },
});
