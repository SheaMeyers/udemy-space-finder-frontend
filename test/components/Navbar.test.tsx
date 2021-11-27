import ReactDom from 'react-dom';
import { StaticRouter } from 'react-router';
import { User } from '../../src/model/Model';
import { Navbar } from '../../src/components/Navbar';


describe('Navbar test suite', () => {
    
    let container: HTMLDivElement;
    const someUser: User = {
        email: 'someEmail',
        userName: 'someUserName'
    }
    const baseLink = 'http://localhost/';

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })
    
    test('Renders correctly with user', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDom.render(
            <StaticRouter>
                <Navbar user={someUser} />        
            </StaticRouter>, 
            container);

        const links = container.querySelectorAll('a');
        expect(links[0].href).toBe(baseLink);
        expect(links[1].href).toBe(baseLink + 'profile');
        expect(links[2].href).toBe(baseLink + 'spaces');
        expect(links[3].href).toBe(baseLink + 'logout');
    })
})