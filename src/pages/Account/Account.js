import useGetUserProfile from "./useGetUserProfile";

const Account = () => {
    const { user, isLoading } = useGetUserProfile();

    return (
        !isLoading && <div className="container rounded bg-white mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 border-right">
                    <div className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px"
                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span
                                    className="font-weight-bold"></span><span className="text-black-50"></span></div>
                            </div>
                            <h4 className="text-right" style={{marginLeft: '6rem', fontSize: '2rem'}}><b>Profile Settings</b></h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6 col-lg-6"><label className="labels">Nume</label><input type="text" disabled style={{ height: '4.5rem', fontSize: '1.5rem' }} className="form-control" placeholder="first name" value={user.lastName} />
                            </div>
                            <div className="col-md-6 col-lg-6"><label className="labels">Prenume</label><input
                                type="text" disabled style={{height: '4.5rem', fontSize: '1.5rem'}}
                                className="form-control" placeholder="surname" value={user.firstName}/></div>
                        </div>
                        <div className="row mt-3" style={{gap: '1rem'}}>
                            <div className="col-md-12 col-lg-12"><label className="labels">Email</label><input
                                type="text" disabled style={{height: '4.5rem', fontSize: '1.5rem'}}
                                className="form-control" value={user.email}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
