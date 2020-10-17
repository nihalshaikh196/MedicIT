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
    
  }
  return (
    <View style={[styles.box]}>
      <Text style={[styles.heading]}>{`\n${name}`}</Text>
      <Text style={[styles.information]}>{`Information:\n         ${info} \n\n Site: ${site} \n\n Route: ${route}`}</Text>
    </View>
  );
};

export default VaccineInfo;

const styles = StyleSheet.create({
  box: {

    backgroundColor: '#4285f4',
    margin:10,
    shadowColor: '#fff',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 5,
    elevation: 5,
    borderWidth:2,
    borderColor:'white',
    marginTop:20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
    color:'white',
    paddingVertical: 6,
    fontWeight: 'bold',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  information: {
    color: 'yellow',
    textAlign: 'left',
    fontSize: 18,
    marginLeft:5,
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
