import { useContext } from 'react';
import { View, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';

import { ExpensesContext } from '../../store/expensens.context';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util';
import { Text } from 'react-native-svg';

export default function Home() {
	const { expenses } = useContext(ExpensesContext);

    const mappedExpenses = expenses.filter(item => item.date.getMonth() == new Date().getMonth()).map(({ date, amount }) => ({ date: getFormattedDate(date), amount }));
    mappedExpenses.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
    })
    const reducedExpenses = mappedExpenses.reduce((prev, current) => {
        if (prev.find(register => register.date == current.date)) {
            const index = prev.findIndex(register => register.date == current.date);
            prev[index].amount += current.amount;
            return prev;
        }

        return [...prev, { date: current.date, amount: current.amount }];
    }, []);

	return (
        <View style={{ flex: 1 }}>
            <Text>Relatório mensal</Text>
            <LineChart style={{ flex: 1 }}
                data={{ 
                    dataSets: [
                        { 
                            label: '',
                            values: reducedExpenses.map(({ date, amount }) => ({ marker: date, y: amount })),
                            config: {
                                drawCircles: true,
                                lineWidth: 1.5,
                                color: processColor(GlobalStyles.colors.accent500),
                                circleColor: processColor(GlobalStyles.colors.accent500),
                                drawFilled: true,
                                fillColor: processColor(GlobalStyles.colors.accent500),
                                drawValues: false,
                            }
                        }
                    ],
                }}
                xAxis={{
                    position: 'BOTTOM',
                    textSize: 12,
                    axisLineColor: processColor(GlobalStyles.colors.primary600),
                    axisLineWidth: 1.5,
                    drawLabels: false
                }}
                yAxis={{
                    left: {
                        axisLineColor: processColor(GlobalStyles.colors.primary600),
                        axisLineWidth: 1.5,
                        textSize: 12,
                        textColor: processColor(GlobalStyles.colors.primary700),
                        drawGridLines: false,
                    },
                    right: {
                        enabled: false,
                    }
                }}
                chartDescription={{ text: '' }}
                marker={{
                    enabled: true
                }}
            />
            <View style={{ flex: 3}}>

            </View>
        </View>
    );
}
