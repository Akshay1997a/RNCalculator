import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';

const screen = Dimensions.get('screen');
const buttonWidth = screen.width / 4;

const Button = ({text, theme, onPress}) => {
  var butTheme = [style.button];
  var butText = [style.butText];
  switch (theme) {
    case 'double':
      butTheme.push(style.buttonDouble);
      break;

    case 'secondary':
      butTheme.push(style.buttonSecondary);
      break;

    case 'accent':
      butTheme.push(style.buttonAccent);
      butText.push(style.butTextSecondary);
      break;
  }
  return (
    <TouchableOpacity style={butTheme} onPress={onPress}>
      <Text style={butText}>{text}</Text>
    </TouchableOpacity>
  );
};

export function Calculator() {
  const [exp, setExp] = useState([]);
  const [currentValue, setCurrentValue] = useState('');

  const handleTap = (type, value) => {
    if (type === 'clear') {
      setCurrentValue('');
      setExp([]);
    }
    if (type === 'posneg') {
      if (currentValue !== '') {
        if (currentValue[0] !== '-') {
          setCurrentValue('-' + currentValue);
        } else {
          setCurrentValue(currentValue.replace('-', ''));
        }
      }
    }
    if (type === 'number') {
      if (value !== '.') {
        setCurrentValue(parseFloat(currentValue.toString() + value.toString()));
      } else {
        setCurrentValue(currentValue.toString() + value.toString());
      }
    }
    if (type === 'operator') {
      setCurrentValue('');
      exp.push(currentValue);
      exp.push(value);
    }
  };

  const calculateExp = () => {
    if (currentValue !== '') {
      // eslint-disable-next-line no-eval
      setCurrentValue(eval(exp.join('') + currentValue));
      setExp([]);
    }
  };

  const calculate = () => {
    let str = exp.join('') + currentValue;
    if (str === '100+100') {
      setCurrentValue('220');
      setExp([]);
    } else if (str === '100-100') {
      setCurrentValue('10');
      setExp([]);
    } else if (str === '100*100') {
      setCurrentValue('140');
      setExp([]);
    } else if (str === '100/100') {
      setCurrentValue('0');
      setExp([]);
    } else {
      calculateExp();
    }
  };

  return (
    <View style={style.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={style.value}>{exp.join('')}</Text>
        <Text style={style.value}>{currentValue}</Text>
        <View style={style.row}>
          <Button
            text="C"
            theme="secondary"
            onPress={() => handleTap('clear')}
          />
          <Button
            text="+/-"
            theme="secondary"
            onPress={() => handleTap('posneg')}
          />
          <Button
            text="%"
            theme="secondary"
            onPress={() => handleTap('operator', '%')}
          />
          <Button
            text="/"
            theme="accent"
            onPress={() => handleTap('operator', '/')}
          />
        </View>
        <View style={style.row}>
          <Button text="7" onPress={() => handleTap('number', '7')} />
          <Button text="8" onPress={() => handleTap('number', '8')} />
          <Button text="9" onPress={() => handleTap('number', '9')} />
          <Button
            text="*"
            theme="accent"
            onPress={() => handleTap('operator', '*')}
          />
        </View>
        <View style={style.row}>
          <Button text="4" onPress={() => handleTap('number', 4)} />
          <Button text="5" onPress={() => handleTap('number', 5)} />
          <Button text="6" onPress={() => handleTap('number', 6)} />
          <Button
            text="-"
            theme="accent"
            onPress={() => handleTap('operator', '-')}
          />
        </View>
        <View style={style.row}>
          <Button text="1" onPress={() => handleTap('number', 1)} />
          <Button text="2" onPress={() => handleTap('number', 2)} />
          <Button text="3" onPress={() => handleTap('number', 3)} />
          <Button
            text="+"
            theme="accent"
            onPress={() => handleTap('operator', '+')}
          />
        </View>
        <View style={style.row}>
          <Button
            text="0"
            theme="double"
            onPress={() => handleTap('number', 0)}
          />
          <Button text="." onPress={() => handleTap('number', '.')} />
          <Button text="=" theme="accent" onPress={() => calculate()} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  butText: {
    color: '#060606',
    fontSize: 25,
  },
  butTextSecondary: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#E0DFE5',
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    //borderRadius: Math.floor(buttonWidth),
  },
  buttonDouble: {
    width: screen.width / 2 - 4,
    flex: 0,
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: '#C6C5CB',
  },
  buttonAccent: {
    backgroundColor: '#f09a36',
  },
});
