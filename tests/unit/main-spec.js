import {lessToJs} from '../../lib/main';

describe('javascript generation', () => {
    describe('lessToJs', () => {
        it('should parse variables', () => {
            expect(lessToJs(`
                @height: 60%;
                @width: 600px;
            `)).toEqual(`export default {
    height: \"60%\",
    width: \"600px\"
}
`);
        });

        it('should quote variables with dashes', () => {
            expect(lessToJs(`
                @content-component-width: 600px;
                @content-main-width: 60%;
            `)).toEqual(`export default {
    \"content-component-width\": \"600px\",
    "content-main-width": \"60%\"
}
`);
        });

        it('should skip non-variables', () => {
            expect(lessToJs(`
                height: 30px; 
                @content-component-width: 600px;
                @content-main-width: 60%;
            `)).toEqual(`export default {
    \"content-component-width\": \"600px\",
    "content-main-width": \"60%\"
}
`);
        });

            it('should sort variables', () => {
                expect(lessToJs(`
                @width: 600px;
                @height: 60%;
            `)).toEqual(`export default {
    height: \"60%\",
    width: \"600px\"
}
`);
            });
    });
});