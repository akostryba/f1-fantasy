export const fetchSession = async () => {
    const response = await fetch('https://api.openf1.org/v1/sessions?session_key=latest');
    if(!response.ok){
        throw new Error('Failed to fetch session data');
    }
    const jsonContent = await response.json();
    return jsonContent.at(0).session_key;
}

export const fetchPosition = async (session_key, driver_number) => {
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

export const fetchDrivers = async () => {
    const response = await fetch('https://api.openf1.org/v1/drivers');
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