import React from 'react';
import { View, Dimensions,Text,StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export const Chart = ({ chartData }) => {
    const screenWidth = Dimensions.get('window').width;

    const renderLegend = () => {
        return chartData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
                <View style={[styles.legendIcon, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{`${item.name}: $${item.amount}`}</Text>
            </View>
        ));
    };

    return (
        <View style={{ backgroundColor: '#e0ffff', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={{
                    backgroundColor: '#e0ffff',
                    backgroundGradientFrom: '#e0ffff',
                    backgroundGradientTo: '#e0ffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"0"}
                center={[screenWidth / 4, 0]}
                absolute
                hasLegend={false} // Disable the built-in legend
            />
            <View style={styles.legendContainer}>
                {renderLegend()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    legendIcon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
    },
});

