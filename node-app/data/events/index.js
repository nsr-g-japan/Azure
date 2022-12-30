

const sql = require('mssql');


var SQL_USER ='';
var SQL_PASSWORD ='' ;
var SQL_DATABASE ='';
var SQL_SERVER='';
var configdb;
//SQL_ENCRYPT= false

const sqldbconfigure =async (Data) => {
  
    try{


        SQL_SERVER = Data[0].sName;
        SQL_DATABASE = Data[1].dbn;
        SQL_USER = Data[2].usern;
        SQL_PASSWORD = Data[3].pw;
        configdb =   { 
            server: SQL_SERVER,
            database: SQL_DATABASE,
            user: SQL_USER,
            password: SQL_PASSWORD,
            options:{
                encrypt:true,
                enableArithAbort: true,
                trustedConnection : true,
            }
        }
        console.log(configdb);

        

    }
    catch(error){
        return error.message;

    }
}


const getTableName =async () => {
    try{
      
        let pool = await sql.connect(configdb);
    
        const list = await pool.request()
        .query("SELECT sys.tables.name AS 'Table Name' FROM sys.tables");
          pool.close();
          console.log(list.recordset);
        return list.recordset;
    }
    catch(error){
        return error.message;
    }

}






const getEvents =async (Id) => {
    try{
        const config =   { 
            user: 'gindev',
            password: 'admin@123',
            server: 'gjndev.database.windows.net',
            database: 'testing_excel_db_JL',
            
            options:{
                encrypt:true,
                enableArithAbort: true,
                trustedConnection : true,
                
            }
        }
        let pool = await sql.connect(config);
                const list = await pool.request().query("select * from " + Id);
       
        return list.recordset;
    }
    catch(error){
        return error.message;
    }

}

const getById = async (Id) => {
    try {
        let pool = await sql.connect(configdb);
        const oneEvent = await pool.request().query("select * from " +Id );
        pool.close();
        console.log(oneEvent);
        return oneEvent.recordset;
        }
    catch(error){
            return error.message;
        }

}

const saveEvent = async(Data)=>{
    try{
        const tablename = Data[0].table;
        const tbl= tablename.trim();
        Data.shift();
        let pool = await sql.connect(configdb);
        const truncate = await pool.request().query('truncate table '+tablename+' ');
        const columns = await pool.request().query(`SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '`+tbl+`' `);
        const colnmset = columns.recordset
        let clmnstr = '';
        for (let i = 0; i < colnmset.length; i++) {
            clmnstr += "[" +colnmset[i].COLUMN_NAME+ "]"+ ' ';
            if (colnmset[i].DATA_TYPE == 'nvarchar'){
                clmnstr += colnmset[i].DATA_TYPE+'(max)'+','+' ';
            }
            else{
                clmnstr +=colnmset[i].DATA_TYPE+','+' ';
    
                }
        }
        const clmnstr1 = clmnstr.slice(0, clmnstr.length - 2);        
        for (let i = -1; i < Data.length -100; i+=100){
            const jsonval1 =Data.slice(i+1 , i+100);
            const jsonval = JSON.stringify(jsonval1);
            const oneEvent = await pool.request()
        .query(`DECLARE @json Nvarchar(max); SET @json = '`+jsonval+`'  INSERT INTO `+tablename+` SELECT * FROM OPENJSON(@json) WITH (`+clmnstr1+`)  `);

           
           }
        const lastind =Data.length  - Data.length %100 ;
        const lsjsonval1 =Data.slice(lastind , Data.length);
        const lsjsonval = JSON.stringify(lsjsonval1);
        
        const oneEvent01 = await pool.request()
    .query(`DECLARE @json Nvarchar(max); SET @json = '`+lsjsonval+`'  INSERT INTO `+tablename+` SELECT * FROM OPENJSON(@json) WITH (`+clmnstr1+`)  `);    
             console.log("Done");
             pool.close();
       
    }
            catch(error){
                console.log(error.message);
                return error.message;
            }
    
    
    }

const createsqltable =async (Data) => {
    try{
        const tablename = Data[0].tableName;
        const clmnname = Data[1].clmnnam;
        let pool = await sql.connect(configdb);
        //const SqlQueries = await utils.loadSqlQueries('events');
        const droptable = await pool.request().query(`DROP TABLE IF EXISTS `+tablename+` `);
        const createtable = await pool.request().query(`create table `+tablename+`(`+clmnname+`)`);
    
        Data.shift();
        Data.shift();
        for (let i = -1; i < Data.length -100; i+=100){
            const jsonval2 =Data.slice(i+1 , i+100);
            const jsonval01 = JSON.stringify(jsonval2);
            const jsonval001 =jsonval01.replace(/'/g, "''");
            const jsonpar =JSON.parse(jsonval001);
            console.log(jsonval001);
            const jsonval012 =JSON.stringify(jsonpar);
            const oneEvent = await pool.request()
                .query(`DECLARE @json Nvarchar(max); SET @json = '`+jsonval01+`'  INSERT INTO `+tablename+` SELECT * FROM OPENJSON(@json) WITH (`+clmnname+`)  `);
            }
        const lastind =Data.length  - Data.length %100 ;
        const lsjsonval01 =Data.slice(lastind , Data.length);
        const lsjsonval1 = JSON.stringify(lsjsonval01);
        const lsjsonval001 =lsjsonval1.replace(/'/g, "''");
        const bulkinsert = await pool.request()
            .query(`DECLARE @json Nvarchar(max); SET @json = '`+lsjsonval001+`'  INSERT INTO `+tablename+` SELECT * FROM OPENJSON(@json) WITH (`+clmnname+`)  `);
        console.log("Done");
        pool.close();
                
        }
        catch(error){
            
            return error.message;
        }
    }


const getByNewId = async (Id) => {
    try {
        let pool = await sql.connect(configdb);
        console.log(configdb);
        var department =['Corporate', 'Manufacturing', 'Sales and Marketing', 'Quality Assurance', 
        'Executive General and Administration', 'Inventory Management', 'Research and Development'];
        var entity =['USA', 'AUSTRALIA', 'Japan', 'Germany', 'France', 'European', 'UK']
        var monthval =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var entyvalu ={"USA":"USD", "AUSTRALIA":"AUD","JAPAN":"Yen"}
        const myArray = Id.split(",");
        console.log(myArray[5]);
        var pydate = Number(myArray[5]) -1
        console.log("1");
        //console.log(department.indexOf(myArray[0]));
        department = Number(department.indexOf(myArray[0])) + 1;
        console.log("2");
        entity = Number(entity.indexOf(myArray[1])) +1
        console.log("3");
        month = Number(monthval.indexOf(myArray[2])) +1 
        console.log("4");
        
        var tempname = ''; 
        if (myArray[6] == 'PnL in mUSD'){
            tempname += ' and a.code between 15000 and 15999';
        } else{
            tempname += ' and a.code NOT between 15000 and 15999';
        }
        var pyqury = '';
        var selectqury = '';
        //console.log(myArray);
        console.log(department. entity, month);
        if (myArray[0]!= ''){
            selectqury +=  ` a.department_Key = `+department +`  and`;
        }
        if (myArray[5]!= 'All'){
         
            selectqury +=  ` year(a.date) = `+myArray[5]+`  and`;
        }
        if (myArray[2]!= 'All'){
         
            selectqury +=  ` month(a.date) = `+month+`  and`;
        }
        if (myArray[1]!= 'All'){
            selectqury +=  ` a.region_Key = `+entity+`  and`;
        }
        selectqury = selectqury.slice(0, -3);
        console.log(selectqury);
        if (myArray[0]!= 'All'){
            pyqury +=   ` and department_Key = `+department +` `;
        if (myArray[2]!= 'All'){
       
            pyqury +=  ` and month(date) = `+month+` `;
        }
        }
        if (myArray[1]!= 'All'){
            pyqury +=  ` and region_Key = `+entity+` `;
        }
     
     //let curny = {"USD" : 81.29, "AUD" : 54.18, "Yen":0.58, "INR":80 }
        let reportval = '';
     //console.log(curny[curncek]);
        var essntval = entyvalu[myArray[1]];
     
        var finalq = ` select (select sum(amount)  FROM fact_actual_data 
        where year(date) = `+pydate+`  `+pyqury+` and code =a.code Group By code) AS [Py Actual], 
        sum(b.amount) as budget_amount, sum(c.amount) as forecast_amount, sum(a.amount) as actual_amount
        from fact_actual_data as a 
        join fact_budget_data as b
        on a.code = b.code
        and a.date = b.date
        and a.region_Key = b.region_Key
        and a.department_Key = b.department_Key
        and a.location = b.location
        join fact_forcast_data as c
        on a.code = c.code
        and a.date = c.date
        and a.region_Key = c.region_Key
        and a.department_Key = c.department_Key
        and a.location = c.location
        where `+selectqury+` `+tempname+` 
        group by a.code, year(a.date),a.accounts order by a.code`

        console.log(finalq);
        const newEvent = await pool.request().query(``+finalq+``);
        pool.close();
        console.log(newEvent.recordset.length)      
        return newEvent.recordset;
        }
    catch(error){
        return error.message;
        }

}

const updateEvent = async (Data) => {
    try{
        console.log(Data)
        console.log("Helloooo")
        for (let i = 1; i < Data.length; i++){
            var umonthval =['all','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            var department =['all','Corporate', 'Manufacturing', 'Sales and Marketing', 'Quality Assurance', 
       'Executive General and Administration', 'Inventory Management', 'Research and Development'];
        var entity =['all', 'USA', 'AUSTRALIA', 'JAPAN', 'Germany', 'France', 'European', 'UK']
            var updatequry= `update fact_actual_data set amount=`+Data[i][6]+` where code =`+Data[i][0]+` and 
            department_key =`+department.indexOf(Data[0][0])+` and year(date) = `+Data[0][5]+` and month(date) = `+umonthval.indexOf(Data[0][2])+`
            and region_key = `+entity.indexOf(Data[0][1])+` 
            update fact_budget_data set amount=`+Data[i][4]+` where code =`+Data[i][0]+` and 
            department_key =`+department.indexOf(Data[0][0])+` and year(date) = `+Data[0][5]+` and month(date) = `+umonthval.indexOf(Data[0][2])+`
            and region_key = `+entity.indexOf(Data[0][1])+`
            update fact_forcast_data set amount=`+Data[i][5]+` where code =`+Data[i][0]+` and 
            department_key =`+department.indexOf(Data[0][0])+` and year(date) = `+Data[0][5]+` and month(date) = `+umonthval.indexOf(Data[0][2])+`
            and region_key = `+entity.indexOf(Data[0][1])+``  
            let pool = await sql.connect(configdb);
            const newEvent = await pool.request().query(``+updatequry+``);
            console.log(newEvent);
        

            console.log(updatequry);

        }
        
        //var updatequry= 'update Excel_Addin$ set Actual=2000, Budget=2012, Forecast=1215 where code =15000'
        //let pool = await sql.connect(configdb);
        //const UpdateEvent = await pool.request().query(``+selectqury+``);
        //console.log(UpdateEvent)
        //pool.close();


    }
catch(error){
    return error.message;
}
}

const drillEvent = async (Data) => {
    try{
        let pool = await sql.connect(configdb);
        console.log(Data)
        const myArray = Data.split(",");
       console.log(myArray);
       var dmonthval =['all','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
       var department =['Corporate', 'Manufacturing', 'Sales and Marketing', 'Quality Assurance', 
       'Executive General and Administration', 'Inventory Management', 'Research and Development'];
        var entity =['USA', 'AUSTRALIA', 'JAPAN', 'Germany', 'France', 'European', 'UK'];
        department = Number(department.indexOf(myArray[0])) + 1;
        entity = Number(entity.indexOf(myArray[1])+1)  
       var drillqury = ` select CONVERT(nvarchar,[date]) As Date, code, accounts, amount, region_Key, department_Key, location, scenario, currency
       from fact_actual_data where code = `+myArray[6]+` `
       console.log(drillqury);
       if (myArray[0]!= ''){
       
        drillqury += ` and department_Key = `+department +` `;
    }
       if (myArray[5]!= '' && myArray[7] == 'pydate'){
        pydate = Number(myArray[5]) -1
        drillqury +=  ` and year(date) = `+pydate+` `;
    }else if(myArray[5]!= ''){
        drillqury +=  ` and year(date) = `+myArray[5]+` `;
    }
    if (myArray[2]!= ''){
      
        drillqury +=   ` and month(date) = `+dmonthval.indexOf(myArray[2])+` `;
    }
    if (myArray[1]!= ''){
     
        drillqury +=  ` and region_Key = `+entity+` `;
    }
    console.log(drillqury);

    const newEvent = await pool.request().query(``+drillqury+``);
    console.log(newEvent.recordset);
    return newEvent.recordset;
        
       


    }
catch(error){
    return error.message;
}
}

module.exports ={

    getEvents,
    getById,
    sqldbconfigure,
    getTableName,
    saveEvent,
    createsqltable,
    getByNewId,
    drillEvent,
    updateEvent,

}