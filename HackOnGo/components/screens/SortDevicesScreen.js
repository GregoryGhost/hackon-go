import React, { Component } from 'react';
import {
    Alert,
    Animated,
    Easing,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    Platform,
} from 'react-native';

import SortableList from 'react-native-sortable-list';


const window = Dimensions.get('window');

const sourceData = {
    0: {
        index: 0,
        image: 'https://placekitten.com/200/240',
        text: 'Chloe',
    },
    1: {
        index: 1,
        image: 'https://placekitten.com/200/201',
        text: 'Jasper',
    },
    2: {
        index: 2,
        image: 'https://placekitten.com/200/202',
        text: 'Pepper',
    },
    3: {
        index: 3,
        image: 'https://placekitten.com/200/203',
        text: 'Oscar',
    },
    4: {
        index: 4,
        image: 'https://placekitten.com/200/204',
        text: 'Dusty',
    },
    5: {
        index: 5,
        image: 'https://placekitten.com/200/205',
        text: 'Spooky',
    },
    6: {
        index: 6,
        image: 'https://placekitten.com/200/210',
        text: 'Kiki',
    },
    7: {
        index: 7,
        image: 'https://placekitten.com/200/215',
        text: 'Smokey',
    },
    8: {
        index: 8,
        image: 'https://placekitten.com/200/220',
        text: 'Gizmo',
    },
    9: {
        index: 9,
        image: 'https://placekitten.com/220/239',
        text: 'Kitty',
    },
};

/**
 * @description Случайное сравнение элементов.
 * @param {any} a Первый элемент.
 * @param {any} b Второй элемент.
 * @returns {number} Возвращает случайный элемент.
 */
function compareRandom(a, b) {
    return Math.random() - 0.5;
}

/**
 * @description Случайное перемешивание 
 *  коллекции пар картинка и ее название.
 * @typedef {{[key:number]:{obj : any}}} DataByNumber
 * @param {DataByNumber} data Коллекция пар картинка и ее название.
 * @returns {DataByNumber} Возвращает перемешенную в 
 *  случайном порядке коллекцию пар картинка и ее название.
 */
function mixData(data) {
    //convert objects to array
    var aData = [];
    for (var index in data) {
        aData.push(data[index]);
    }
    //random mix elements
    aData.sort(compareRandom);

    //convert array to object
    var obj = aData.reduce(function (acc, cur, i) {
        acc[i] = cur;
        return acc;
    }, {});

    return obj;
}


export default class SortDevicesScreen extends Component {
    static navigationOptions = {
        title: 'Выполнение задания'
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Расположите устройства по порядку</Text>
                <SortableList
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={mixData(sourceData)}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }

    _renderRow = ({ data, active, index }) => {
        return <Row data={data} active={active} index={index} />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },

    title: {
        fontSize: 20,
        alignItems: 'center',
        paddingVertical: 20,
        color: '#999999',
    },

    list: {
        flex: 1,
    },

    contentContainer: {
        width: window.width,

        ...Platform.select({
            ios: {
                paddingHorizontal: 30,
            },

            android: {
                paddingHorizontal: 0,
            }
        })
    },

    rowOrdered: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,


        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2 },
                shadowRadius: 2,
            },

            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        })
    },
    //dublicate style for row
    rowChaos: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,


        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2 },
                shadowRadius: 2,
            },

            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        })
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25,
    },

    text: {
        fontSize: 24,
        color: '#222222',
    },
});


class Row extends Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);
        
        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        const { data, active, index } = this.props;

        var status = function(indexOrder, indexItem, styles){
            return (indexOrder === indexItem) ? 
                styles.rowOrdered : styles.rowChaos;
        };

        return (
            <Animated.View style={[
                status(data.index, index, styles),
                this._style,
            ]}>
                <Text style={styles.text}>{data.index} </Text>
                <Image source={{ uri: data.image }} style={styles.image} />
                <Text style={styles.text}>{data.text}</Text>
            </Animated.View>
        );
    }
}