import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const MeetingCarousel = ({meetings, meetingIndex, setMeetingIndex}) => {

    const goPrev = () => {
        if (meetingIndex > 0) {
            if ( !meetings[meetingIndex - 1].meeting_name.includes('Testing')) {
                setMeetingIndex(meetingIndex - 1);
            }
        }
    };

    const goNext = () => {
        if (meetingIndex < meetings.length - 1) setMeetingIndex(meetingIndex + 1);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goPrev}>
                <Ionicons name="chevron-back" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.text}>{meetings[meetingIndex].circuit_short_name}</Text>
            <TouchableOpacity onPress={goNext}>
                <Ionicons name="chevron-forward" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#15151e',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        marginHorizontal: 5,
    },
});
 
export default MeetingCarousel;