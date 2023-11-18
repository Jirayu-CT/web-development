const { query } = require('../database')

const getMember = async (request, reply) => {
    try {
        const result = await query('SELECT * FROM members')
        reply.send(result)
    } catch (err) {
        throw err
    }
}

const getMemberById = async (request, reply) => {
    try {
        const result = await query('SELECT * FROM members WHERE id = ?', [request.params.id])
        reply.send(result)
    } catch (err) {
        throw err
    }
}

const addMember = async (request, reply) => {
    // let member_name = request.body.member_name
    // let member_surname = request.body.member_surname
    // let member_email = request.body.member_email
    // let member_password = request.body.member_password
    // let member_phone = request.body.member_phone

    try {
        const result = await query('INSERT INTO members SET ?', [request.body])
        reply.send(result)
    } catch (err) {
        throw err
    }
}

const updateMember = async (request, reply) => {
    // let member_name = request.body.member_name
    // let member_surname = request.body.member_surname
    // let member_email = request.body.member_email
    // let member_password = request.body.member_password
    // let member_phone = request.body.member_phone

    try {
        const result = await query('UPDATE member SET ? WHERE id = ?', [request.body, request.params.id])
        reply.send(result)
    } catch (err) {
        throw err
    }
}

const deleteMember = async (request, reply) => {
    
    try {
        const result = await query('DELETE FROM members WHERE id = ?', [request.params.id])
        reply.send(result)
    } catch (err) {
        throw err
    }
}


module.exports = {
    getMember,
    getMemberById,
    addMember,
    updateMember,
    deleteMember
}



