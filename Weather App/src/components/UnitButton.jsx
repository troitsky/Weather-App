export default function UnitButton({
    unitType, 
    setUnits,
    selectedUnits}) 
    
    {
    
    let temp_unit;
    if (unitType === 'metric') temp_unit = '°C'
    if (unitType === 'imperial') temp_unit = '°F'
    
     //set conditional styling for selected unit button
    const selectedUnitStyle = { 
        background:" #E7E7EB", 
        color: "#110E3C"
    }

    return (
        <button 
            className='btn_circle btn_unit_selection' style={selectedUnits === unitType ? selectedUnitStyle : null} 
            onClick={() => setUnits(unitType)}>
            {temp_unit}
        </button>
    )
}