package permissions

import "github.com/hotline-modern/server/internal/db"

const (
	RoleAdmin    = "admin"
	RoleOperator = "operator"
	RoleMember   = "member"
	RoleGuest    = "guest"
)

type Manager struct {
	db *db.DB
}

func New(database *db.DB) *Manager {
	return &Manager{db: database}
}

func (m *Manager) GetRole(publicKey string) string {
	user, err := m.db.GetUser(publicKey)
	if err != nil {
		return RoleGuest
	}
	return user.Role
}

func (m *Manager) SetRole(publicKey, role string) error {
	return m.db.SetUserRole(publicKey, role)
}

func (m *Manager) CheckChannelOverride(channel, role, permission string) *bool {
	return m.db.CheckChannelPermission(channel, role, permission)
}

func (m *Manager) CanChat(role, channel string) bool {
	// Check channel-specific override first
	if override := m.CheckChannelOverride(channel, role, "chat"); override != nil {
		return *override
	}
	// Fall back to default logic
	if role == RoleGuest {
		return channel == "lobby"
	}
	return role == RoleAdmin || role == RoleOperator || role == RoleMember
}

func (m *Manager) CanJoinChannel(role, channel string) bool {
	if role == RoleGuest {
		return channel == "lobby"
	}
	return true
}

func (m *Manager) CanCreateChannel(role string) bool {
	return role == RoleAdmin || role == RoleOperator || role == RoleMember
}

func (m *Manager) CanUpload(role string) bool {
	return role == RoleAdmin || role == RoleOperator
}

func (m *Manager) CanDownload(role string) bool {
	return role != RoleGuest
}

func (m *Manager) CanKick(role string) bool {
	return role == RoleAdmin || role == RoleOperator
}

func (m *Manager) CanBan(role string) bool {
	return role == RoleAdmin || role == RoleOperator
}

func (m *Manager) CanSetRole(actorRole, targetRole string) bool {
	if actorRole != RoleAdmin {
		return false
	}
	return targetRole == RoleOperator || targetRole == RoleMember || targetRole == RoleGuest
}

func CanMute(role string) bool {
	return role == RoleAdmin || role == RoleOperator
}

func RoleLevel(role string) int {
	switch role {
	case RoleAdmin:
		return 4
	case RoleOperator:
		return 3
	case RoleMember:
		return 2
	case RoleGuest:
		return 1
	default:
		return 0
	}
}
