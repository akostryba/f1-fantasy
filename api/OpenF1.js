export const fetchSession = async (name, meeting_key) => {
    console.log("Fetching Session");
    const response = await fetch('https://api.openf1.org/v1/sessions?meeting_key=' + meeting_key + '&session_name=' + name);
    if(!response.ok){
        console.log(response);
        throw new Error('Failed to fetch session data');
    }
    const jsonContent = await response.json();
    return jsonContent.at(0).session_key;
}

export const fetchMeeting = async () => {
    console.log("Fetching Meeting");
    const response = await fetch('https://api.openf1.org/v1/meetings?meeting_key=latest');
    if(!response.ok){
        console.log(response)
        throw new Error('Failed to fetch meeting data');
    }
    const jsonContent = await response.json();
    return jsonContent.at(0).meeting_key;
}

export const fetchPosition = async (session_key, driver_number) => {
    console.log("fetching:" + session_key + " " + driver_number);
    const response = await fetch('https://api.openf1.org/v1/position?session_key=' + session_key + '&driver_number=' + driver_number);
    if(!response.ok){
        throw new Error('Failed to fetch position data');
    }
    const jsonContent = await response.json();

    const finalPositions = Object.values(
        jsonContent.reduce((acc, item) => {
            const driverNumber = item.driver_number;
            // Always overwrite with the latest position for the driver
            acc[driverNumber] = item;
            return acc;
        }, {})
    );
    return finalPositions[0];
}

export const fetchDrivers = async (meeting_key) => {
    console.log("Fetching Drivers");
    const response = await fetch('https://api.openf1.org/v1/drivers?meeting_key='+meeting_key);
    if(!response.ok){
        throw new Error('Failed to fetch driver data');
    }
    const jsonContent = await response.json();

    const driversByNumber = jsonContent.reduce((acc, driver) => {
        acc[driver.driver_number] = driver;
        return acc;
    }, {});
    return driversByNumber;
}