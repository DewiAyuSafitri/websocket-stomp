export const findDuplicates = (array, from) => {
     const nameCount = {};
     const duplicates = [];
   
     array.forEach((obj) => {
       if (nameCount[obj[from]]) {
         nameCount[obj[from]] += 1;
       } else {
         nameCount[obj[from]] = 1;
       }
     });
   
     for (const key in nameCount) {
       if (nameCount[key] > 1) {
         duplicates.push(key);
       }
     }
   
     return duplicates;
   };
   