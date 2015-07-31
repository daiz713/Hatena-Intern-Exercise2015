package LogCounter;
use strict;
use warnings;

sub new {
    my ($class, $logs) = @_;
    return bless { logs => $logs }, $class;
};

sub group_by_user {
  my $self = shift;
  my @logs = @{$self->{logs}};
  # 返り値用のリファレンス
  my $res = {};

  for my $log (@logs) {
    # ユーザー名または"guest"を得る
    my $user_name = (exists $log->{user}) ? $log->{user} : "guest";
    # まだユーザー名のキーが無ければ作る
    if(not exists $res->{$user_name}) {
      $res->{$user_name} = [];
    }
    # ユーザー名の配列に追加する
    push $res->{$user_name}, $log;
  }

  return $res;
}

sub count_error {
  my $self = shift;
  # 引数はリファレンス
  # ブレースを使ってデリファレンス
  my @logs = @{$self->{logs}};
  my $err_total = 0;

  for my $log (@logs) {
    $_ = $log->{status};
    if(m/^5\d+\d+$/) {
      $err_total += 1;
    }
  }

  return $err_total;
}

1;
