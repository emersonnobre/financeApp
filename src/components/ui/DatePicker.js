import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import DatePicker from "react-native-date-picker";

import TextLink from "./TextLink";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util";

export default function CustomDatePicker({ onConfirm = () => {}, label, initialValue, style = {} }) {
    const [date, setDate] = useState(initialValue || new Date());
    const [open, setOpen] = useState(false);

    function openHandler() {
        setOpen(true);
    }

    function cancelHandler() {
        setOpen(false);
    }

    function confirmHandler(date) {
        setDate(date);
        setOpen(false);
        onConfirm(date);
    }

    return (
        <View style={[styles.outerContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                <TextLink 
                    onPress={openHandler}
                    iconName="calendar"
                >
                    {getFormattedDate(date)}
                </TextLink>
                <DatePicker
                    modal
                    open={open}
                    mode="date"
                    date={date}
                    onCancel={cancelHandler}
                    onConfirm={confirmHandler}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        marginVertical: 8,
    },
    container: {
        backgroundColor: "white",
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        fontWeight: 600,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary500,
        flex: 1,
    },
    label: {
        color: GlobalStyles.colors.primary800,
        fontWeight: 600,
        fontSize: 13,
        marginBottom: 6,
    }
});