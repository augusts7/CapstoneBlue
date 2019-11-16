import * as XLSX from "xlsx";


export default class ExcelFileReader {

    static readFile = (fileToRead, callback, ) => {

        let name = fileToRead.name;
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (evt) => {

            /* Parse data */
            const fileDataAsBinaryString = evt.target.result;
            const workbook = XLSX.read(fileDataAsBinaryString, {type: rABS ? 'binary' : 'array'});

            let allWorksheetsData = [];
            let jsonData;

            /* Get all worksheets */
            workbook.SheetNames.forEach((worksheetName) => {
                const worksheet = workbook.Sheets[worksheetName];
                const xlRowObject = XLSX.utils.sheet_to_json(worksheet);
                allWorksheetsData = allWorksheetsData.concat(xlRowObject);
            });

            callback(allWorksheetsData);
        };
        if (rABS) {
            reader.readAsBinaryString(fileToRead);
        } else {
            reader.readAsArrayBuffer(fileToRead);
        }
    };

}