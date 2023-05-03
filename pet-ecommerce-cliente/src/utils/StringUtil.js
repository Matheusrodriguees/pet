export class StringUtil {
    /**
     * Compara duas strings ignorando MAIUSCULO/MINUSCULO, espaços e acentuação
     */
    static softCompareString(text1, text2){
        const filterTextFormatted = StringUtil.replaceSpecialCharacters(
            text1.trim().toUpperCase(),
        );
        const filterText2Formatted = StringUtil.replaceSpecialCharacters(
            text2.trim().toUpperCase(),
        );
        return filterTextFormatted.includes(filterText2Formatted)
    }

    static replaceSpecialCharacters(string){
        let stringClone = string;
        return stringClone.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}